import { GitHubUser } from './types';

export const getAccessToken = async (authToken: string) => {
  const url = 'https://github.com/login/oauth/access_token';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: authToken,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch access token');
  }

  const body = await response.json();

  return body.access_token;
};

export const getGithubUser = async (accessToken: string) => {
  const url = 'https://api.github.com/user';
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch github user');
  }

  const body = await response.json();

  return body as GitHubUser;
};
