import { CombinedError } from '@urql/core';
import {
  CreateMessageDocument,
  CreateMessageMutation,
  CreateMessageMutationVariables,
  GetMessagesDocument,
  GetMessagesQuery,
} from '../generated/graphql';
import { client } from './gqlClient';

type OperationOptions<T> = {
  onSuccess: (data: T) => void;
  onError: (error: Error | CombinedError) => void;
};

export const fetchMessages =
  (opts?: Partial<OperationOptions<GetMessagesQuery['messages']>>) =>
  async () => {
    try {
      const res = await client.query(GetMessagesDocument, {});

      if (res.error) {
        throw res.error;
      }
      if (res.data?.messages) {
        opts?.onSuccess?.(res.data?.messages);
      }
      return res.data?.messages;
    } catch (error) {
      opts?.onError?.(error as Error | CombinedError);
    }
  };

export const postMessage = async (
  input: CreateMessageMutationVariables,
  opts?: Partial<OperationOptions<CreateMessageMutation['createMessage']>>
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
