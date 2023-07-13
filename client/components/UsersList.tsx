import { CombinedError } from '@urql/core';
import { For, Show, createResource } from 'solid-js';
import { getUsers } from '../data';

type UsersListProps = {
  onError: (error: Error | CombinedError) => void;
};

export const UsersList = (props: UsersListProps) => {
  const [users] = createResource({ onError: props.onError }, getUsers);

  return (
    <Show when={!users.loading} fallback={<div>Loading...</div>}>
      <div class="mt-2 flex flex-col gap-2">
        <div class="text-xs">Users:</div>
        <div class="flex gap-2">
          <For each={users()}>
            {({ username }) => (
              <span class="badge badge-outline-secondary badge-xs">
                {username}
              </span>
            )}
          </For>
        </div>
      </div>
    </Show>
  );
};
