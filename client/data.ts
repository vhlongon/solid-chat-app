import { CombinedError } from '@urql/core';
import {
  CreateMessageDocument,
  CreateMessageMutation,
  CreateMessageMutationVariables,
  DeleteMessageDocument,
  DeleteMessageMutation,
  GetMessagesDocument,
  GetMessagesQuery,
  UpdateMessageDocument,
  UpdateMessageMutation,
  UpdateMessageMutationVariables,
} from '../generated/graphql';
import { client } from './gqlClient';
import { OperationOptions } from './types';

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

export const editMessage = async (
  input: UpdateMessageMutationVariables,
  opts?: Partial<OperationOptions<UpdateMessageMutation['updateMessage']>>
) => {
  try {
    const { data, error } = await client.mutation(UpdateMessageDocument, input);

    if (error) {
      throw error;
    }

    const createdMessage = data?.updateMessage;

    if (createdMessage) {
      opts?.onSuccess?.(createdMessage);
    }

    return data?.updateMessage;
  } catch (error) {
    opts?.onError?.(error as Error | CombinedError);
  }
};

export const deleteMessage = async (
  id: string,
  opts?: Partial<OperationOptions<DeleteMessageMutation['deleteMessage']>>
) => {
  try {
    const { data, error } = await client.mutation(DeleteMessageDocument, {
      id,
    });

    if (error) {
      throw error;
    }

    const deletedMessage = data?.deleteMessage;

    if (deletedMessage) {
      opts?.onSuccess?.(deletedMessage);
    }

    return data?.deleteMessage;
  } catch (error) {
    opts?.onError?.(error as Error | CombinedError);
  }
};
