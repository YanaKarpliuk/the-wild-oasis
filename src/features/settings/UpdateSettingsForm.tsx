import Form from '../../ui/Form.tsx';
import FormRow from '../../ui/FormRow.tsx';
import Input from '../../ui/Input.tsx';
import Spinner from '../../ui/Spinner.tsx';
import type { FocusEvent } from 'react';
import useSettings from './useSettings.ts';
import useUpdateSetting from './useUpdateSetting.ts';

function UpdateSettingsForm() {
  // Get settings.
  const {
    // Set to empty {} initially to avoid undefined error.
    settings: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {},
    isLoading
  } = useSettings();

  // Mutate settings.
  const { updateSettingMutate, isUpdating } = useUpdateSetting();

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
