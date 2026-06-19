import { type SubmitEvent, useState } from 'react';
import Button from '../../ui/Button.tsx';
import Form from '../../ui/Form.tsx';
import Input from '../../ui/Input.tsx';
import FormRowVertical from '../../ui/FormRowVertical.tsx';
import useLogin from './useLogin.ts';
import SpinnerMini from '../../ui/SpinnerMini.tsx';

export default function LoginForm() {
  const [email, setEmail] = useState('yana@test.com');
  const [password, setPassword] = useState('12345678');
  const { loginMutate, isPending } = useLogin();

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return;
    loginMutate({ email, password }, {
      onSettled: () => {
        setEmail('');
        setPassword('');
      }
    });
  }

  return (
      <Form onSubmit={handleSubmit}>
        <FormRowVertical label="Email address">
          <Input
              type="email"
              id="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
          />
        </FormRowVertical>
        <FormRowVertical label="Password">
          <Input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button $size="large" ariaLabel={'Log in'} disabled={isPending}>
            {!isPending ? 'Log in' : <SpinnerMini/>}
          </Button>
        </FormRowVertical>
      </Form>
  );
}
