import { CombinedError } from '@urql/core';
import { Component, JSX, createResource, createSignal } from 'solid-js';
import { getMe } from '../data';

const errorSignal = createSignal<Error | CombinedError | null>(null);

export const errors = errorSignal[0];
export const setErrors = errorSignal[1];

const [me] = createResource(getMe({ onError: setErrors }), {});

interface HeaderProps {
  children: JSX.Element;
}

export const Layout: Component<HeaderProps> = (props) => {
  const logout = () => {
    sessionStorage.removeItem('authToken');
    window.location.reload();
  };

  return (
    <div>
      {me() ? (
        <div>
          user: {me()?.username}{' '}
          <button type="button" onclick={logout}>
            logout
          </button>
        </div>
      ) : null}
      <div>{props.children}</div>
      {errors() && <div>{errors?.()?.message}</div>}
    </div>
  );
};
