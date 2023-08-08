import { useNavigate, useSearchParams } from '@solidjs/router';
import { CombinedError } from '@urql/core';
import { Show, createEffect, createSignal } from 'solid-js';
import { ErrrorBox } from '../components/ErrrorBox';
import { Spinner } from '../components/Spinner';
import { authenticateUser, getAuthUrl } from '../data';
import { setAuthToken } from '../storage';

export const Login = () => {
  const [errors, setErrors] = createSignal<Error | CombinedError | null>(null);
  const [loading, setLoading] = createSignal(false);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams<{ code: string }>();

  const handleAccessToken = async (accessToken: string) => {
    if (!accessToken) return;

    setLoading(true);

    authenticateUser(accessToken, {
      onError: setErrors,
    })
      .then((res) => {
        if (res?.token) {
          setAuthToken(res.token);
          navigate('/');
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
    <div class="min-h-[100dvh] w-screen flex justify-center items-center">
      <Show when={!loading()} fallback={<Spinner>Loading chat</Spinner>}>
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
      </Show>
    </div>
  );
};

export default Login;
