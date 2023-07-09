/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment MessageFragment on Message {\n  id\n  content\n  createdAt\n}": types.MessageFragmentFragmentDoc,
    "fragment UserFragment on User {\n  id\n  username\n  email\n}": types.UserFragmentFragmentDoc,
    "mutation CreateMessage($content: String!, $userId: ID!) {\n  createMessage(content: $content, userId: $userId) {\n    id\n    content\n    createdAt\n  }\n}": types.CreateMessageDocument,
    "query GetMessage($id: ID!) {\n  message(id: $id) {\n    id\n    content\n    createdAt\n    user {\n      id\n      username\n    }\n  }\n}": types.GetMessageDocument,
    "query GetMessages {\n  messages {\n    id\n    content\n    user {\n      ...UserFragment\n    }\n  }\n}": types.GetMessagesDocument,
    "query GetUser($id: ID!) {\n  user(id: $id) {\n    id\n    username\n    messages {\n      id\n      content\n      createdAt\n    }\n  }\n}": types.GetUserDocument,
    "query GetUsers {\n  users {\n    id\n    username\n    messages {\n      ...MessageFragment\n    }\n  }\n}": types.GetUsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment MessageFragment on Message {\n  id\n  content\n  createdAt\n}"): (typeof documents)["fragment MessageFragment on Message {\n  id\n  content\n  createdAt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserFragment on User {\n  id\n  username\n  email\n}"): (typeof documents)["fragment UserFragment on User {\n  id\n  username\n  email\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateMessage($content: String!, $userId: ID!) {\n  createMessage(content: $content, userId: $userId) {\n    id\n    content\n    createdAt\n  }\n}"): (typeof documents)["mutation CreateMessage($content: String!, $userId: ID!) {\n  createMessage(content: $content, userId: $userId) {\n    id\n    content\n    createdAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetMessage($id: ID!) {\n  message(id: $id) {\n    id\n    content\n    createdAt\n    user {\n      id\n      username\n    }\n  }\n}"): (typeof documents)["query GetMessage($id: ID!) {\n  message(id: $id) {\n    id\n    content\n    createdAt\n    user {\n      id\n      username\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetMessages {\n  messages {\n    id\n    content\n    user {\n      ...UserFragment\n    }\n  }\n}"): (typeof documents)["query GetMessages {\n  messages {\n    id\n    content\n    user {\n      ...UserFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUser($id: ID!) {\n  user(id: $id) {\n    id\n    username\n    messages {\n      id\n      content\n      createdAt\n    }\n  }\n}"): (typeof documents)["query GetUser($id: ID!) {\n  user(id: $id) {\n    id\n    username\n    messages {\n      id\n      content\n      createdAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUsers {\n  users {\n    id\n    username\n    messages {\n      ...MessageFragment\n    }\n  }\n}"): (typeof documents)["query GetUsers {\n  users {\n    id\n    username\n    messages {\n      ...MessageFragment\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;