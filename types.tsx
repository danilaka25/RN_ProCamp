/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import Routes from './src/config/navigation/routes';

const rootStack = {
  [typeof Routes]: undefined,
} as const;

export type RootStackParamList = typeof rootStack;