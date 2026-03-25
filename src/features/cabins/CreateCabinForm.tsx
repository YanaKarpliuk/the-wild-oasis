import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Input from '../../ui/Input.tsx';
import Form from '../../ui/Form.tsx';
import Button from '../../ui/Button.tsx';
import FileInput from '../../ui/FileInput.tsx';
import Textarea from '../../ui/Textarea.tsx';
import FormRow from '../../ui/FormRow.tsx';
import type { NewCabin, Cabin } from '../../services/apiCabins.ts';
import useCreateCabin from './useCreateCabin.ts';
import useUpdateCabin from './useUpdateCabin.ts';

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  padding-top: 12px;
`;

type Props = {
  cabinToEdit?: Cabin
}

function CreateCabinForm({ cabinToEdit }: Props) {
  // Mutate fns from custom hooks.
  const { createCabinMutate, isCreating } = useCreateCabin();
  const { updateCabinMutate, isUpdating } = useUpdateCabin();
  const isInProgress = isCreating || isUpdating;

  const { id: editId, ...editValues } = cabinToEdit || {};
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm<NewCabin>({
    defaultValues: isEditSession ? editValues : {}
  });
  const { errors } = formState;

  function onSubmit(data: NewCabin) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession) {
      // Add additional onSuccess method.
      updateCabinMutate({ newCabinData: { ...data, image }, id: editId }, {
        onSuccess: () => reset()
      });
    } else {
      createCabinMutate({ newCabinData: { ...data, image } }, {
        onSuccess: () => reset()
      });
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
          <Button $variation="secondary" type="reset" ariaLabel={'Reset the form'}>
            Cancel
          </Button>
          <Button disabled={isInProgress} ariaLabel={isEditSession ? 'Edit cabin' : 'Create cabin'}>
            {isEditSession ? 'Edit cabin' : 'Create cabin'}
          </Button>
        </ButtonRow>
      </Form>
  );
}

export default CreateCabinForm;
