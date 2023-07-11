import { createSignal } from 'solid-js';
import {
  GetMessagesQuery,
  UserFragmentFragment,
} from '../../generated/graphql';
import { deleteMessage, editMessage } from '../data';
import { OperationOptions } from '../types';

type ExcludeNullAndUndefined<T> = Exclude<T, null | undefined>;

type Props = ExcludeNullAndUndefined<GetMessagesQuery['messages']>[number] & {
  meId: string;
} & Partial<OperationOptions>;

export const MessageInput = (props: Props) => {
  const [value, setValue] = createSignal(props.content);

  const isOwnMessage = () =>
    (props.author as UserFragmentFragment).id === props.meId;

  const onEdit = (id: string) => async () => {
    editMessage(
      { id, content: value() },
      {
        onError: props.onError,
        onSuccess: (data) => {
          props.onSuccess?.(data);
        },
      }
    );
  };

  const onDelete = (id: string) => async () => {
    deleteMessage(id, {
      onError: props.onError,
    });
  };

  const formatDate = (date: string) => {
    const formattedTime = new Date(date).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return formattedTime;
  };

  return (
    <div
      class={`flex gap-2 items-center w-full ${
        isOwnMessage() ? 'justify-end' : 'justify-start'
      }`}
    >
      <div class="flex flex-col">
        <div class="flex items-center">
          <div class="avatar avatar-ring avatar-sm w-8">
            <img
              src={(props.author as UserFragmentFragment)?.imageUrl}
              alt={(props.author as UserFragmentFragment)?.username}
            />
          </div>
          <input
            class="input input-solid"
            value={value()}
            type="text"
            disabled={!isOwnMessage()}
            oninput={(e) => setValue(e.currentTarget.value)}
          />
        </div>

        <div class="w-full flex justify-between items-center mt-0.5">
          <span
            class={`text-xs text-gray-500 m-1 && ${
              isOwnMessage() ? 'text-right' : 'text-left'
            }`}
          >
            {formatDate(props.createdAt)}
          </span>
          {isOwnMessage() && (
            <div class="flex gap-2 items-center">
              <button
                type="button"
                class="btn btn-ghost btn-circle btn-xs"
                onClick={onEdit(props.id)}
                disabled={props.content === value()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>

              <button
                type="button"
                class="btn btn-ghost btn-circle btn-xs"
                onClick={onDelete(props.id)}
                disabled={!isOwnMessage()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
