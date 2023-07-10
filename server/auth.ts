import chalk from 'chalk';
import jwt from 'jsonwebtoken';
import { JWTPayload } from './types';

const secret = process.env.JWT_SECRET;

export const getTokenFromHeaders = (headers: Headers) => {
  const auth = headers?.get('Authorization');
  const token = auth?.replace('Bearer ', '');
  return token;
};

export const getUserIdFromToken = (token: string) => {
  try {
    const { userId } = jwt.verify(token, secret) as JWTPayload;
    return userId;
  } catch (error) {
    console.log(
      chalk.red.bold(`Error decoding jwt: ${JSON.stringify(error, null, 2)}`)
    );
    return null;
  }
};

export const createToken = (userId: string) => {
  return jwt.sign({ userId }, secret);
};
