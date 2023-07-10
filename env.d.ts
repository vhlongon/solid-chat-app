/// <reference types="vite/client" />

// client only
interface ImportMetaEnv {
  readonly VITE_GRAPHQL_ENDPOINT: string;
  readonly VITE_GRAPHQL_ENDPOINT_WS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// server only
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      PORT: string;
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
    }
  }
}

export {};
