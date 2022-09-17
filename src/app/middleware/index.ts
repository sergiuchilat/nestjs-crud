import { LoggerMiddleware } from './guards/logger.middleware';
export default [
  {
    name: 'logger',
    routes: '*',
    guard: LoggerMiddleware,
  },
];
