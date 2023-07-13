import { createSignal } from 'solid-js';
import { postMessage } from '../data';
import { OperationOptions } from '../types';

type Props = Partial<OperationOptions>;
export const NewMessageInput = (props: Props) => {
  const [newMessage, setNewMessage] = createSignal('');
  const addMessage = async () => {
    postMessage(
      {
        content: newMessage(),
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
        oninput={(e) => setNewMessage(e.currentTarget.value)}
        class="textarea textarea-ghost-primary max-w-none"
        onKeyDown={onKeyDown}
      />
      <button type="button" class="btn btn-primary" disabled={!newMessage().length} onclick={onClick}>
        Send
      </button>
    </div>
  );
};
