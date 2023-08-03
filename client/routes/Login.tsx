import { useNavigate, useSearchParams } from '@solidjs/router';
import { CombinedError } from '@urql/core';
import { createEffect, createSignal } from 'solid-js';
import { ErrrorBox } from '../components/ErrrorBox';
import { authenticateUser, getAuthUrl } from '../data';
import { setAuthToken } from '../storage';

export const Login = () => {
  const [errors, setErrors] = createSignal<Error | CombinedError | null>(null);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams<{ code: string }>();

  const handleAccessToken = (accessToken: string) => {
    if (accessToken) {
      authenticateUser(accessToken, {
        onError: setErrors,
      }).then((res) => {
        if (res?.token) {
          setAuthToken(res.token);
          navigate('/');
        }
      });
    }
  };

  createEffect(() => {
    handleAccessToken(searchParams.code);
  });

  const onLogin = async () => {
    const authUrl = await getAuthUrl({
      onError: setErrors,
    });

    if (!authUrl) {
      return;
    }

    window.location.href = authUrl;
  };
  return (
    <div class="h-screen w-screen flex justify-center items-center">
      <div class="card">
        <div class="card-body">
          <h2 class="card-header">Login with github to chat</h2>
          <p class="text-content2">It will only access your public information</p>
          <div class="card-footer">
            <button onClick={onLogin} class="btn btn-secondary bt-lg">
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
