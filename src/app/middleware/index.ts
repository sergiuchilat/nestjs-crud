import { ParseTokenGuard } from './guards/parse.token.guard';
export default [
  {
    name: 'parse_token',
    routes: '*',
    guard: ParseTokenGuard,
  },
];
