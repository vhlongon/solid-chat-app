import { Resolvers } from '../../../generated/resolvers-types';

export const authUrl: Resolvers['Query']['authUrl'] = () => {
  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.append('client_id', process.env.GITHUB_CLIENT_ID);

  return url.toString();
};
