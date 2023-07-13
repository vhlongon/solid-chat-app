import { CombinedError } from '@urql/core';
import { Show } from 'solid-js';
import { logoutUser } from '../data';

type HeaderProps = {
  username: string;
  imagUrl: string;
  isLoggedIn: boolean;
  onError: (error: Error | CombinedError) => void;
};

export const Header = (props: HeaderProps) => {
  const logout = async () => {
    const isLoggedOut = await logoutUser({ onError: props.onError });

    if (isLoggedOut) {
      sessionStorage.removeItem('authToken');
      window.location.reload();
    }
  };

  return (
    <Show when={props.isLoggedIn}>
      <div class="navbar">
        <div class="nav-start">
          <div class="flex gap-4 items-center">
            <div class="avatar avatar-ring-secondary">
              <div>
                <img src={props.imagUrl} alt={props.username} />
              </div>
            </div>
            {props.username}
          </div>
        </div>
        <div class="navbar-end">
          <button type="button" class="btn btn-error btn-sm" onclick={logout}>
            logout
          </button>
        </div>
      </div>
    </Show>
  );
};
