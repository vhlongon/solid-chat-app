import { makePersisted } from '@solid-primitives/storage';
import { createSignal } from 'solid-js';

// eslint-disable-next-line solid/reactivity
export const [authToken, setAuthToken] = makePersisted(createSignal<null | string>(null), {
  storage: sessionStorage,
  name: 'authToken',
});
