import { For, createResource, createSignal } from 'solid-js';
import {
  CreateMessageDocument,
  CreateMessageMutation,
  CreateMessageMutationVariables,
  GetMessagesDocument,
} from '../generated/graphql';
import { client } from './gqlClient';
import { CombinedError } from '@urql/core';

const fetchMessages = async () => {
  const res = await client.query(GetMessagesDocument, {});
  return res.data?.messages;
};

type MutationOptions<T> = {
  onSuccess: (data: T) => void;
  onError: (error: Error | CombinedError) => void;
};
const createMessage = async (
  input: CreateMessageMutationVariables,
  opts?: Partial<MutationOptions<CreateMessageMutation['createMessage']>>
) => {
  try {
    const { data, error } = await client.mutation(CreateMessageDocument, input);

    if (error) {
      throw error;
    }

    const createdMessage = data?.createMessage;

    if (createdMessage) {
      opts?.onSuccess?.(createdMessage);
    }

    return data?.createMessage;
  } catch (error) {
    opts?.onError?.(error as Error | CombinedError);
  }
};
export const App = () => {
  const [content, setContent] = createSignal('');
  const [messages, { refetch }] = createResource(fetchMessages);
  const [errors, setErrors] = createSignal<Error | CombinedError | null>(null);

  const onClick = async () => {
    createMessage(
      {
        content: content(),
        userId: '1',
      },
      {
        onSuccess: () => {
          refetch();
          setContent('');
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
          value={content()}
          oninput={(e) => setContent(e.currentTarget.value)}
        />
        <button type="button" onclick={onClick}>
          Send
        </button>
      </div>
      {errors() && <div>{errors?.()?.message}</div>}
    </div>
  );
};
