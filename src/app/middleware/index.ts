import { AuthGuard } from './guards/auth.guard';
export default [
  {
    name: 'auth',
    routes: '*',
    guard: AuthGuard,
  },
];
