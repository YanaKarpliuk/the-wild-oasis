import Form from '../../ui/Form.tsx';
import FormRow from '../../ui/FormRow.tsx';
import Input from '../../ui/Input.tsx';

function UpdateSettingsForm() {
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
