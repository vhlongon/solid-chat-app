import { Show } from 'solid-js';

type ErrorBoxProps = {
  message?: string;
};

export const ErrrorBox = (props: ErrorBoxProps) => {
  return (
    <Show when={props.message}>
      <div class="alert alert-error">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM24 26C22.9 26 22 25.1 22 24V16C22 14.9 22.9 14 24 14C25.1 14 26 14.9 26 16V24C26 25.1 25.1 26 24 26ZM26 34H22V30H26V34Z"
            fill="#E92C2C"
          />
        </svg>
        <div class="flex flex-col">
          <span>Error:</span>
          <span class="text-content2">{props.message}</span>
        </div>
      </div>
    </Show>
  );
};
