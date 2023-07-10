import { createSignal } from 'solid-js';
import { Message } from '../../generated/graphql';
import { deleteMessage, editMessage } from '../data';
import { OperationOptions } from '../types';

type Props = Partial<OperationOptions> & Pick<Message, 'id' | 'content'>;

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

  return (
    <div>
      <input
        style={{
          border: isActive() ? '1px solid grey' : 'none',
          outline: 'none',
        }}
        value={value()}
        type="text"
        oninput={(e) => setValue(e.currentTarget.value)}
        onfocus={onFocus}
      />
      <button type="button" onClick={onEdit(props.id)}>
        edit
      </button>
      <button type="button" onClick={onDelete(props.id)}>
        delete
      </button>
    </div>
  );
};
