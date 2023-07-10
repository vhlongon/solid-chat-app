import { CombinedError } from '@urql/core';

export type OperationOptions<T = unknown> = {
  onSuccess: (data: T) => void;
  onError: (error: Error | CombinedError) => void;
};
