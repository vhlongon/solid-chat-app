import { CombinedError } from '@urql/core';
import { For } from 'solid-js';
import { Message } from '../../generated/graphql';
import { MessageInput } from './MessageInput';

type MessageListProps = {
  messages: Message[];
  onError: (error: Error | CombinedError) => void;
  meId: string;
};
export const MessagesList = (props: MessageListProps) => {
  return (
    <For each={props.messages} fallback={<span class="text-gray-500">No messages yet...</span>}>
      {({ content, id, author, createdAt }) => {
        return (
          <MessageInput
            content={content}
            createdAt={createdAt}
            id={id}
            author={author}
            onError={props.onError}
            meId={props.meId}
            isOwner={props.meId === author.id}
          />
        );
      }}
    </For>
  );
};
