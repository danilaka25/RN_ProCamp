/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import Routes from './src/navigation/routes';

const rootStack = {
  [Routes.root.main]: undefined,
  [Routes.root.notFound]: undefined,
} as const;

export type RootStackParamList = typeof rootStack;