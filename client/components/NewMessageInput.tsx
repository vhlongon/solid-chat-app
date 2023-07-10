import { createSignal } from 'solid-js';
import { OperationOptions } from '../types';
import { postMessage } from '../data';

type Props = Partial<OperationOptions>;
export const NewMessageInput = (props: Props) => {
  const [newMessage, setNewMessage] = createSignal('');

  const addMessage = async () => {
    postMessage(
      {
        content: newMessage(),
        userId: '1', //tODO: get from auth
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
    <div>
      <input
        type="text"
        value={newMessage()}
        oninput={(e) => setNewMessage(e.currentTarget.value)}
      />
      <button type="button" onclick={addMessage}>
        Send
      </button>
    </div>
  );
};
