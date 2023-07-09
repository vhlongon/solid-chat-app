/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_ENDPOINT: string;
  readonly VITE_GRAPHQL_ENDPOINT_WS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
