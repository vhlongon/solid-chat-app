import { For } from 'solid-js';
import { User } from '../../generated/graphql';

type UsersListProps = {
  users: User[];
};

export const UsersList = (props: UsersListProps) => {
  return (
    <div class="mt-2 flex flex-col gap-2">
      <div class="text-xs">Users:</div>
      <div class="flex gap-2">
        <For each={props.users}>
          {({ username, isLogged }) => (
            <span
              classList={{
                'badge-outline-success': isLogged,
                'opacity-50': !isLogged,
              }}
              class="badge badge-xs"
            >
              {username}
            </span>
          )}
        </For>
      </div>
    </div>
  );
};
