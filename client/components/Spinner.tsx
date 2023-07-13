import { Component, JSX } from 'solid-js';

type SpinnerProps = {
  children?: JSX.Element;
};

export const Spinner: Component<SpinnerProps> = (props) => {
  return (
    <div class="flex gap-2">
      <span class={`text-secondary text-xs`}>{props.children}</span>
      <div class="spinner-wave spinner-secondary spinner-sm">
        <div class="spinner-wave-dot"></div>
        <div class="spinner-wave-dot"></div>
        <div class="spinner-wave-dot"></div>
        <div class="spinner-wave-dot"></div>
      </div>
    </div>
  );
};
