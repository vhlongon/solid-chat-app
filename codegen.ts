import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './schema.graphql',
  documents: ['client/**/*.gql'],
  generates: {
    './generated/': {
      preset: 'client',
    },
    './generated/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        avoidOptionals: true,
      },
    },
  },
};
export default config;
