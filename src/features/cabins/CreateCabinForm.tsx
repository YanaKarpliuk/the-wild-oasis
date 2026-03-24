import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Input from '../../ui/Input.tsx';
import Form from '../../ui/Form.tsx';
import Button from '../../ui/Button.tsx';
import FileInput from '../../ui/FileInput.tsx';
import Textarea from '../../ui/Textarea.tsx';
import FormRow from '../../ui/FormRow.tsx';
import { createEditCabin } from '../../services/apiCabins.ts';
import type { NewCabin, Cabin } from '../../services/apiCabins.ts';

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  padding-top: 12px;
`;

function CreateCabinForm({ cabinToEdit }: { cabinToEdit?: Cabin }) {
  const { id: editId, ...editValues } = cabinToEdit || {};
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm<NewCabin>({
    defaultValues: isEditSession ? editValues : {}
  });
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate: createCabinMutate, isPending: isCreating } = useMutation({
    mutationFn: ({ newCabinData }: { newCabinData: NewCabin }) => createEditCabin(newCabinData),
    onSuccess: () => {
      toast.success('Cabin was successfully created.');
      // Refresh UI to display updated data.
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
      reset();
    },
    onError: (err) => toast.error(err.message)
  });

  const { mutate: editCabinMutate, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }: { newCabinData: NewCabin, id: number | undefined }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin was successfully edited.');
      // Refresh UI to display updated data.
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
      reset();
    },
    onError: (err) => toast.error(err.message)
  });

  const isInProgress = isCreating || isEditing;

  function onSubmit(data: NewCabin) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession) {
      editCabinMutate({ newCabinData: { ...data, image }, id: editId });
    } else {
      createCabinMutate({ newCabinData: { ...data, image } });
    }
  }

  return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow error={errors?.name?.message || ''} label={'Cabin name'}>
          <Input type="text" id="name"
                 disabled={isInProgress}
                 {...register('name', {
                   required: 'This field is required.'
                 })}/>
        </FormRow>

        <FormRow error={errors?.maxCapacity?.message || ''} label={'Maximum capacity'}>
          <Input type="number" id="maxCapacity"
                 disabled={isInProgress}
                 {...register('maxCapacity', {
                   required: 'This field is required.',
                   min: {
                     value: 1,
                     message: 'Capacity should be at least 1.'
                   }
                 })}/>
        </FormRow>

        <FormRow error={errors?.regularPrice?.message || ''} label={'Regular price'}>
          <Input type="number" id="regularPrice"
                 disabled={isInProgress}
                 {...register('regularPrice', {
                   required: 'This field is required.',
                   min: {
                     value: 1,
                     message: 'Price should be at least 1.'
                   }
                 })}/>
        </FormRow>

        <FormRow error={errors?.discount?.message || ''} label={'Discount'}>
          <Input type="number" id="discount" defaultValue={0}
                 disabled={isInProgress}
                 {...register('discount', {
                   required: 'This field is required.',
                   // Render error based on another field value.
                   validate: (value) =>
                       value < getValues().regularPrice || 'Discount should be less than the regular price.'
                 })}/>
        </FormRow>

        <FormRow error={errors?.description?.message || ''} label={'Description for website'}>
          <Textarea id="description" defaultValue=""
                    disabled={isInProgress}
                    {...register('description', {
                      required: 'This field is required.'
                    })}/>
        </FormRow>

        <FormRow label={'Cabin photo'}>
          <FileInput id="image" accept="image/*"
                     disabled={isInProgress}
                     {...register('image', {
                       required: !isEditSession ? 'This field is required.' : false
                     })}/>
        </FormRow>

        <ButtonRow>
          <Button $variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isInProgress}>{isEditSession ? 'Edit cabin' : 'Create cabin'}</Button>
        </ButtonRow>
      </Form>
  );
}

export default CreateCabinForm;
