import { useNavigate } from '@solidjs/router';
import { CombinedError } from '@urql/core';
import { For, createEffect, createResource, createSignal } from 'solid-js';
import { pipe, subscribe } from 'wonka';
import { Message, MessagesDocument } from '../../generated/graphql';
import { Header } from '../components/Header';
import { MessageInput } from '../components/MessageInput';
import { NewMessageInput } from '../components/NewMessageInput';
import { fetchMessages, getAuthVefication, getMe } from '../data';
import { client } from '../gqlClient';

const [addedMessages, setAddedMessages] = createSignal<Message[]>([]);
const [error, setError] = createSignal<Error | CombinedError | null>(null);

pipe(
  client.subscription(MessagesDocument, {}),
  subscribe((result) => {
    const messages = (result?.data?.messages ?? []) as Message[];
    setAddedMessages(messages);
  })
);

const Chat = () => {
  const [me] = createResource(getMe({ onError: setError }), {});
  const [initialMessages] = createResource(
    fetchMessages({
      onError: setError,
    })
  );
  const messages = () => {
    return addedMessages()?.length ? addedMessages() : initialMessages();
  };

  return (
    <div>
      <Header
        isLoggedIn={Boolean(me()?.username)}
        username={me()?.username ?? ''}
      />
      <div>
        <For each={messages()}>
          {({ content, id, author, createdAt }) => (
            <MessageInput
              content={content}
              createdAt={createdAt}
              id={id}
              author={author}
              onError={setError}
              meId={me()?.id ?? ''}
            />
          )}
        </For>
      </div>

      <div>
        <NewMessageInput onError={setError} />
      </div>
      {error() ? <div>{error()?.message}</div> : null}
    </div>
  );
};

const ProtectedRouteChat = () => {
  const navigate = useNavigate();

  const authToken = window.sessionStorage.getItem('authToken');

  if (!authToken) {
    navigate('/login');
    return null;
  }

  createEffect(async () => {
    const res = await getAuthVefication(authToken, {
      onError: setError,
    });

    if (!res) {
      navigate('/login');
    }
  });

  return <Chat />;
};

export default ProtectedRouteChat;
