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
        contextType: '../server/types#Context',
        avoidOptionals: true,
        mappers: {
          User: '.prisma/client#User as UserModel',
          Message: '.prisma/client#Message as MessageModel',
        },
      },
    },
  },
};
export default config;
