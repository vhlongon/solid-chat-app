import { useNavigate } from '@solidjs/router';
import { CombinedError } from '@urql/core';
import { Show, createEffect, createResource, createSignal } from 'solid-js';
import { pipe, subscribe } from 'wonka';
import { Message, MessagesDocument, User, UsersDocument } from '../../generated/graphql';
import { ErrrorBox } from '../components/ErrrorBox';
import { Header } from '../components/Header';
import { MessagesList } from '../components/MessagesList';
import { NewMessageInput } from '../components/NewMessageInput';
import { getAuthVefication, getMe, getMessages, getUsers } from '../data';
import { client } from '../gqlClient';
import { UsersList } from './../components/UsersList';

const [updatedMessages, setUpdatedMessages] = createSignal<Message[]>([]);
const [updatedUsers, setUpdatedUsers] = createSignal<User[]>([]);
const [error, setError] = createSignal<Error | CombinedError | null>(null);

pipe(
  client.subscription(MessagesDocument, {}),
  subscribe((result) => {
    const messages = (result?.data?.messages ?? []) as Message[];
    setUpdatedMessages(messages);
  })
);

pipe(
  client.subscription(UsersDocument, {}),
  subscribe((result) => {
    const users = (result?.data?.users ?? []) as User[];
    setUpdatedUsers(users);
  })
);

const Chat = () => {
  const [me] = createResource(getMe({ onError: setError }));
  const [initialUsers] = createResource({ onError: setError }, getUsers);
  const [initialMessages] = createResource({ onError: setError }, getMessages);

  return (
    <div class="flex flex-col h-screen">
      <div class="h-14">
        <Header
          isLoggedIn={Boolean(me()?.username)}
          username={me()?.username ?? ''}
          imagUrl={me()?.imageUrl ?? ''}
          onError={setError}
        />
      </div>
      <div class="flex-grow flex flex-col justify-center items-center">
        <div class="card min-w-[600px]">
          <div class="card-body">
            <div class="flex flex-col gap-1">
              <Show when={initialMessages()?.length} fallback="Loading messages...">
                <MessagesList
                  messages={((updatedMessages().length ? updatedMessages() : initialMessages()) || []) as Message[]}
                  onError={setError}
                  meId={me()?.id ?? ''}
                />
              </Show>
            </div>

            <Show when={initialUsers()?.length} fallback="Loading users...">
              <UsersList users={(updatedUsers().length ? updatedUsers() : initialUsers()) || []} />
            </Show>

            <div class="card-footer">
              <NewMessageInput onError={setError} />
            </div>
          </div>
          <ErrrorBox message={error()?.message} />
        </div>
      </div>
    </div>
  );
};

const ProtectedRouteChat = () => {
  const navigate = useNavigate();

  const [authToken] = createSignal(window.sessionStorage.getItem('authToken') || '');

  if (!authToken()) {
    navigate('/login');
    return null;
  }

  createEffect(async () => {
    const res = await getAuthVefication(authToken(), {
      onError: setError,
    });

    if (!res) {
      navigate('/login');
    }
  });

  return <Chat />;
};

export default ProtectedRouteChat;
