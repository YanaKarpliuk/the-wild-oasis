import supabase from './supabase.ts';

export type NewCabin = {
  description: string,
  discount: number,
  image: File,
  maxCapacity: number,
  name: string,
  regularPrice: number
}

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createCabin(newCabin: NewCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
  const imagePath = `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_IMG_PATH}/${imageName}`;

  // 1. Create cabin.
  const { data, error } = await supabase
      .from('cabins')
      .insert([{ ...newCabin, image: imagePath }]);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // 2. Upload image.
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
