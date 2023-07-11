import { createSignal } from 'solid-js';
import { OperationOptions } from '../types';
import { postMessage } from '../data';

type Props = Partial<OperationOptions>;
export const NewMessageInput = (props: Props) => {
  const [newMessage, setNewMessage] = createSignal('');

  const addMessage = async () => {
    if (!newMessage()) return;
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

  return (
    <div class="flex items-center justify-center w-full mt-2 gap-2">
      <textarea
        rows={1}
        value={newMessage()}
        oninput={(e) => setNewMessage(e.currentTarget.value)}
        class="textarea textarea-ghost-primary max-w-none"
      />
      <button type="button" class="btn btn-primary" onclick={addMessage}>
        Send
      </button>
    </div>
  );
};
