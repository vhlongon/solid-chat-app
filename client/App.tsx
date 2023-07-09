import { CombinedError } from '@urql/core';
import { For, createResource, createSignal } from 'solid-js';
import { postMessage, fetchMessages } from './data';
import { Message, MessagesDocument } from '../generated/graphql';
import { pipe, subscribe } from 'wonka';
import { client } from './gqlClient';

const [addedMessages, setAddedMessages] = createSignal<Message[]>([]);

pipe(
  client.subscription(MessagesDocument, {}),
  subscribe((result) => {
    const messages = (result?.data?.messages ?? []) as Message[];
    setAddedMessages(messages);
  })
);

export const App = () => {
  const [newMessage, setNewMessage] = createSignal('');
  const [errors, setErrors] = createSignal<Error | CombinedError | null>(null);
  const [initialMessages] = createResource(
    fetchMessages({
      onError: setErrors,
    })
  );

  const messages = () => {
    return addedMessages()?.length ? addedMessages() : initialMessages();
  };

  const onClick = async () => {
    postMessage(
      {
        content: newMessage(),
        userId: '1',
      },
      {
        onSuccess: () => {
          setNewMessage('');
        },
        onError: setErrors,
      }
    );
  };

  return (
    <div>
      <div>
        <For each={messages()}>{({ content }) => <div>{content}</div>}</For>
      </div>

      <div>
        <input
          type="text"
          value={newMessage()}
          oninput={(e) => setNewMessage(e.currentTarget.value)}
        />
        <button type="button" onclick={onClick}>
          Send
        </button>
      </div>
      {errors() && <div>{errors?.()?.message}</div>}
    </div>
  );
};
