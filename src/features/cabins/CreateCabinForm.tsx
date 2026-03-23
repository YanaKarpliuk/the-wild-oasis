import Input from '../../ui/Input.tsx';
import Form from '../../ui/Form.tsx';
import Button from '../../ui/Button.tsx';
import FileInput from '../../ui/FileInput.tsx';
import Textarea from '../../ui/Textarea.tsx';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins.ts';
import toast from 'react-hot-toast';
import type { NewCabin } from '../../services/apiCabins.ts';
import FormRow from '../../ui/FormRow.tsx';
import styled from 'styled-components';

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  padding-top: 12px;
`;

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm<NewCabin>();
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
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

  function onSubmit(data: NewCabin) {
    mutate({ ...data, image: data.image[0] });
  }

  return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow error={errors?.name?.message || ''} label={'Cabin name'}>
          <Input type="text" id="name"
                 disabled={isPending}
                 {...register('name', {
                   required: 'This field is required.'
                 })}/>
        </FormRow>

        <FormRow error={errors?.maxCapacity?.message || ''} label={'Maximum capacity'}>
          <Input type="number" id="maxCapacity"
                 disabled={isPending}
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
                 disabled={isPending}
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
                 disabled={isPending}
                 {...register('discount', {
                   required: 'This field is required.',
                   // Render error based on another field value.
                   validate: (value) =>
                       value < getValues().regularPrice || 'Discount should be less than the regular price.'
                 })}/>
        </FormRow>

        <FormRow error={errors?.description?.message || ''} label={'Description for website'}>
          <Textarea id="description" defaultValue=""
                    disabled={isPending}
                    {...register('description', {
                      required: 'This field is required.'
                    })}/>
        </FormRow>

        <FormRow label={'Cabin photo'}>
          <FileInput id="image" accept="image/*"
                     disabled={isPending}
                     {...register('image', {
                       required: 'This field is required.'
                     })}/>
        </FormRow>

        <ButtonRow>
          <Button $variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isPending}>Add cabin</Button>
        </ButtonRow>
      </Form>
  );
}

export default CreateCabinForm;
