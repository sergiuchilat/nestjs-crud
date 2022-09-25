import { ParseToken } from './middleware/parse.token';
export default [
  {
    name: 'parse_token',
    routes: '*',
    guard: ParseToken,
  },
];
