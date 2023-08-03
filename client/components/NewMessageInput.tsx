import { createSignal } from 'solid-js';
import { postMessage } from '../data';
import { OperationOptions } from '../types';

type NewMessageInputProps = Partial<OperationOptions>;

export const NewMessageInput = (props: NewMessageInputProps) => {
  const [newMessage, setNewMessage] = createSignal('');
  const addMessage = async () => {
    if (!newMessage().trim().length) {
      return;
    }

    postMessage(
      {
        content: newMessage().trim(),
      },
      {
        onSuccess: (data) => {
          props.onSuccess?.(data);
          setNewMessage('');
        },
        onError: props.onError,
      }
    );
  };

  const onClick = async () => {
    addMessage();
  };

  const onKeyDown = async (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      addMessage();
    }
  };

  return (
    <div class="flex items-center justify-center w-full mt-2 gap-2">
      <textarea
        rows={1}
        value={newMessage()}
        onInput={(e) => setNewMessage(e.currentTarget.value)}
        class="textarea textarea-ghost-primary max-w-none"
        onKeyDown={onKeyDown}
      />
      <button type="button" class="btn btn-primary" disabled={!newMessage().length} onClick={onClick}>
        Send
      </button>
    </div>
  );
};
