import { useNavigate, useSearchParams } from '@solidjs/router';
import { CombinedError } from '@urql/core';
import { createEffect, createSignal } from 'solid-js';
import { ErrrorBox } from '../components/ErrrorBox';
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
    <div class="h-screen w-screen flex justify-center items-center">
      <div class="card">
        <div class="card-body">
          <h2 class="card-header">Login with github to chat</h2>
          <p class="text-content2">
            It will only access your public information
          </p>
          <div class="card-footer">
            <button onclick={onLogin} class="btn btn-secondary bt-lg">
              Login
            </button>
          </div>
        </div>
        <ErrrorBox message={errors()?.message} />
      </div>
    </div>
  );
};

export default Login;
