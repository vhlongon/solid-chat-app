import { CombinedError } from '@urql/core';
import { For, createResource, createSignal } from 'solid-js';
import { pipe, subscribe } from 'wonka';
import { Message, MessagesDocument } from '../generated/graphql';
import { MessageInput } from './components/MessageInput';
import { NewMessageInput } from './components/NewMessageInput';
import { fetchMessages } from './data';
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
  const [errors, setErrors] = createSignal<Error | CombinedError | null>(null);
  const [initialMessages] = createResource(
    fetchMessages({
      onError: setErrors,
    })
  );

  const messages = () => {
    return addedMessages()?.length ? addedMessages() : initialMessages();
  };

  return (
    <div>
      <div>
        <For each={messages()}>
          {({ content, id }) => (
            <MessageInput content={content} id={id} onError={setErrors} />
          )}
        </For>
      </div>

      <div>
        <NewMessageInput onError={setErrors} />
      </div>
      {errors() && <div>{errors?.()?.message}</div>}
    </div>
  );
};
