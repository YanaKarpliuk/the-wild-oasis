import supabase from './supabase.ts';

export type Cabin = {
  id: number;
  created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

export type NewCabin = {
  description: string,
  discount: number,
  image: File | string,
  maxCapacity: number,
  name: string,
  regularPrice: number
}

type Filter = {
  field: string;
  method: 'eq' | 'gt';
  value: number;
}

type SortBy = {
  field: string;
  direction: string;
}

type CabinArgs = {
  filter: Filter | null;
  sortBy: SortBy;
}

export async function getCabins({ filter, sortBy }: CabinArgs) {
  let query = supabase
      .from('cabins')
      .select('*');

  // Filter.
  if (filter) query = query[filter.method || 'eq'](filter.field, filter.value)

  // Sort.
  if (sortBy) query = query.order(sortBy.field, {ascending: sortBy.direction === 'asc'})

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createEditCabin(newCabin: NewCabin, id?: number) {
  // You'll get image path if image is not updated on edit. Otherwise, you'll get File.
  const hasImagePath = typeof newCabin.image === 'string' && newCabin.image?.startsWith?.(import.meta.env.VITE_API_URL);
  const imageName = `${Math.random()}-${typeof newCabin.image === 'object' && newCabin.image.name}`.replaceAll('/', '');
  const imagePath = hasImagePath ? newCabin.image : `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_IMG_PATH}/${imageName}`;

  // 1. Create/edit cabin.
  let query;

  // A. Create.
  if (!id) query = supabase.from('cabins').insert([{ ...newCabin, image: imagePath }]);

  // B. Edit.
  if (id) query = supabase.from('cabins').update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query!.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // 2. Upload image.
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading the image.
  if (storageError) {
    await supabase
        .from('cabins')
        .delete()
        .eq('id', data.id);
    console.error(storageError);
    throw new Error('Cabin could not be created');
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase
      .from('cabins')
      .delete()
      .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return data;
}
