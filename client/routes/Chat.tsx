import { useNavigate } from '@solidjs/router';
import { CombinedError } from '@urql/core';
import { Show, createEffect, createResource, createSignal } from 'solid-js';
import { pipe, subscribe } from 'wonka';
import { Message, MessagesDocument, User, UsersDocument } from '../../generated/graphql';
import { ErrrorBox } from '../components/ErrrorBox';
import { Header } from '../components/Header';
import { MessagesList } from '../components/MessagesList';
import { NewMessageInput } from '../components/NewMessageInput';
import { Spinner } from '../components/Spinner';
import { getAuthVefication, getMe, getMessages, getUsers } from '../data';
import { client } from '../gqlClient';
import { authToken } from '../storage';
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

  const messages = () => (updatedMessages().length ? updatedMessages() : (initialMessages() as Message[])) || [];
  const users = () => (updatedUsers().length ? updatedUsers() : initialUsers()) || [];

  return (
    <div class="flex flex-col min-h-[100dvh]">
      <div class="h-14">
        <Header
          isLoggedIn={Boolean(me()?.username)}
          username={me()?.username ?? ''}
          imagUrl={me()?.imageUrl ?? ''}
          onError={setError}
        />
      </div>
      <div class="flex-grow flex flex-col justify-center items-center px-4">
        <div class="card" style={{ 'min-width': 'min(100%, 600px)' }}>
          <div class="card-body">
            <div class="flex flex-col gap-1">
              <Show when={!initialMessages.loading || messages().length} fallback={<Spinner>Loading messages</Spinner>}>
                <MessagesList messages={messages()} onError={setError} meId={me()?.id ?? ''} />
              </Show>
            </div>

            <Show when={!initialUsers.loading || users().length} fallback={<Spinner>Loading users</Spinner>}>
              <UsersList users={users()} />
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
  const token = authToken();

  createEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      getAuthVefication(token, {
        onError: setError,
      }).then((res) => {
        if (!res) {
          navigate('/login');
        }
      });
    }
  });

  return (
    <Show when={authToken()}>
      <Chat />
    </Show>
  );
};

export default ProtectedRouteChat;
