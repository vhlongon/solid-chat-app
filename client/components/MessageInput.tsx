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
  const [isActive, setIsActive] = createSignal(false);

  const onFocus = () => {
    setIsActive(true);
  };

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

  const isOwnMessage = () =>
    (props.author as UserFragmentFragment).id === props.meId;

  return (
    <div>
      <input
        style={{
          background: isOwnMessage() ? 'white' : '#e8e8e8',
          color: isOwnMessage() ? 'black' : 'grey',
          border: isActive() ? '1px solid grey' : 'none',
          outline: 'none',
        }}
        value={value()}
        type="text"
        oninput={(e) => setValue(e.currentTarget.value)}
        onfocus={onFocus}
      />
      <button
        type="button"
        onClick={onEdit(props.id)}
        disabled={!isOwnMessage() || props.content === value()}
      >
        edit
      </button>
      <button
        type="button"
        onClick={onDelete(props.id)}
        disabled={!isOwnMessage()}
      >
        delete
      </button>
    </div>
  );
};
