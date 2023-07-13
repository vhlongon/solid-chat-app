import { GetUsersDocument, GetUsersQuery } from './../generated/graphql';
import { CombinedError } from '@urql/core';
import {
  AuthenticateDocument,
  AuthenticateMutation,
  CreateMessageDocument,
  CreateMessageMutation,
  CreateMessageMutationVariables,
  DeleteMessageDocument,
  DeleteMessageMutation,
  GetAuthUrlDocument,
  GetAuthUrlQuery,
  GetMessagesDocument,
  GetMessagesQuery,
  MeDocument,
  MeQuery,
  UpdateMessageDocument,
  UpdateMessageMutation,
  UpdateMessageMutationVariables,
  VerifyAuthDocument,
  VerifyAuthMutation,
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

export const getAuthUrl = async (
  opts?: Partial<OperationOptions<GetAuthUrlQuery['authUrl']>>
) => {
  try {
    const { data, error } = await client.query(GetAuthUrlDocument, {});

    if (error) {
      throw error;
    }

    return data?.authUrl;
  } catch (error) {
    opts?.onError?.(error as Error | CombinedError);
  }
};

export const authenticateUser = async (
  accessToken: string,
  opts?: Partial<OperationOptions<AuthenticateMutation['authenticate']>>
) => {
  try {
    const { data, error } = await client.mutation(AuthenticateDocument, {
      accessToken,
    });

    if (error) {
      throw error;
    }

    const authenticatedUser = data?.authenticate;

    if (authenticatedUser) {
      opts?.onSuccess?.(authenticatedUser);
    }

    return data?.authenticate;
  } catch (error) {
    opts?.onError?.(error as Error | CombinedError);
  }
};

export const getMe =
  (opts?: Partial<OperationOptions<MeQuery['me']>>) => async () => {
    try {
      const { data, error } = await client.query(MeDocument, {});

      if (error) {
        throw error;
      }

      return data?.me;
    } catch (error) {
      opts?.onError?.(error as Error | CombinedError);
    }
  };

export const getAuthVefication = async (
  token: string,
  opts?: Partial<OperationOptions<VerifyAuthMutation['verifyAuth']>>
) => {
  try {
    const { data, error } = await client.mutation(VerifyAuthDocument, {
      token,
    });

    if (error) {
      throw error;
    }

    return data?.verifyAuth;
  } catch (error) {
    opts?.onError?.(error as Error | CombinedError);
  }
};

export const getUsers = async (
  opts?: Partial<OperationOptions<GetUsersQuery['users']>>
) => {
  try {
    const { data, error } = await client.query(GetUsersDocument, {});

    if (error) {
      throw error;
    }

    return data?.users;
  } catch (error) {
    opts?.onError?.(error as Error | CombinedError);
  }
};
