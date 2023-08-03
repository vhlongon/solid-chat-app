import { createSignal } from 'solid-js';
import { Message } from '../../generated/graphql';
import { deleteMessage, editMessage } from '../data';
import { OperationOptions } from '../types';
import { MessageButtons } from './MessageButtons';

type MessageInputProps = Omit<Message, 'content'> & {
  initialContent: string;
  meId: string;
} & Partial<OperationOptions>;

export const MessageInput = (props: MessageInputProps) => {
  const [value, setValue] = createSignal(props.initialContent);

  const onEdit = async () => {
    editMessage(
      { id: props.id, content: value() },
      {
        onError: props.onError,
        onSuccess: (data) => {
          props.onSuccess?.(data);
        },
      }
    );
  };

  const onDelete = async () => {
    deleteMessage(props.id, {
      onError: props.onError,
    });
  };

  const onKeyDown = async (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onEdit();
    }
  };

  const containerClassList = () => ({
    'justify-end': props.isOwner,
    'justify-start': !props.isOwner,
  });

  return (
    <div class={`flex gap-2 items-center w-full`} classList={containerClassList()}>
      <div class="flex flex-col w-full">
        <div class={`flex items-center gap-2 text-xs text-gray-500 m-1`} classList={containerClassList()}>
          <div class="avatar avatar-ring avatar-sm w-8">
            <span
              class="dot absolute top-[-6px] left-[-6px]"
              classList={{
                'dot-success': props.author.isLogged,
                'dot-error': !props.author.isLogged,
              }}
            />

            <img
              classList={{
                'opacity-50': !props.author.isLogged,
              }}
              src={props.author?.imageUrl}
              alt={props.author?.username}
            />
          </div>
          <input
            class="input input-solid flex-1 text-sm"
            value={value()}
            type="text"
            disabled={!props.isOwner}
            onInput={(e) => setValue(e.currentTarget.value)}
            onKeyDown={onKeyDown}
          />
        </div>
        <div class={`w-full flex items-center mt-0.5`} classList={containerClassList()}>
          <MessageButtons
            disabled={value() === props.initialContent}
            isOwner={props.isOwner}
            onEdit={onEdit}
            createdAt={props.createdAt}
            onDelete={onDelete}
          />
        </div>
      </div>
    </div>
  );
};
