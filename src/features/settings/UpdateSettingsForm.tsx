import Form from '../../ui/Form.tsx';
import FormRow from '../../ui/FormRow.tsx';
import Input from '../../ui/Input.tsx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSettings, type Setting, updateSetting } from '../../services/apiSettings.ts';
import Spinner from '../../ui/Spinner.tsx';
import toast from 'react-hot-toast';
import type { FocusEvent } from 'react';

function UpdateSettingsForm() {
  const queryClient = useQueryClient();

  // Get settings.
  const {
    isLoading,
    data: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {}
  } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings
  });

  // Edit settings.
  const { mutate: updateSettingMutate, isPending: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Setting was successfully edited.');
      // Refresh UI to display updated data.
      queryClient.invalidateQueries({
        queryKey: ['settings']
      });
    },
    onError: (err) => toast.error(err.message)
  });

  function handleUpdate(e: FocusEvent<HTMLInputElement>, field: string) {
    const { value } = e.target;
    if (!value) return;
    updateSettingMutate({ [field]: value });
  }

  if (isLoading) return <Spinner/>;

  return (
      <Form>
        <FormRow label="Minimum nights/booking">
          <Input type="number" id="min-nights"
                 defaultValue={minBookingLength}
                 disabled={isUpdating}
                 onBlur={(e) => handleUpdate(e, 'minBookingLength')}/>
        </FormRow>

        <FormRow label="Maximum nights/booking">
          <Input type="number" id="max-nights" defaultValue={maxBookingLength}
                 disabled={isUpdating}
                 onBlur={(e) => handleUpdate(e, 'maxBookingLength')}/>
        </FormRow>

        <FormRow label="Maximum guests/booking">
          <Input type="number" id="max-guests" defaultValue={maxGuestsPerBooking}
                 disabled={isUpdating}
                 onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}/>
        </FormRow>

        <FormRow label="Breakfast price">
          <Input type="number" id="breakfast-price" defaultValue={breakfastPrice}
                 disabled={isUpdating}
                 onBlur={(e) => handleUpdate(e, 'breakfastPrice')}/>
        </FormRow>
      </Form>
  );
}

export default UpdateSettingsForm;
