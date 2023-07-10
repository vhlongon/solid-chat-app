import { useNavigate, useSearchParams } from '@solidjs/router';
import { CombinedError } from '@urql/core';
import { createEffect, createSignal } from 'solid-js';
import { authenticateUser, getAuthUrl } from '../data';

export const Login = () => {
  const [errors, setErrors] = createSignal<Error | CombinedError | null>(null);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams<{ code: string }>();

  createEffect(async () => {
    const accessToken = searchParams.code;

    if (accessToken) {
      const res = await authenticateUser(accessToken, {
        onError: setErrors,
      });

      if (res?.token) {
        window.sessionStorage.setItem('authToken', res.token);
        navigate('/');
      }
    }
  });

  const onLogin = async () => {
    const authUrl = await getAuthUrl({
      onError: setErrors,
    });

    if (!authUrl) {
      return;
    }

    window.location.href = authUrl;

    navigate(authUrl);
  };
  return (
    <div>
      <div>
        <button onclick={onLogin}>Login</button>
      </div>
      {errors() && <div>{errors?.()?.message}</div>}
    </div>
  );
};

export default Login;
