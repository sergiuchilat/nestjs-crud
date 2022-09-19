import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../modules/auth/auth.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements NestMiddleware {
  constructor(private reflector: Reflector, private authService: AuthService) {}
  private static parseAuthToken(request): string {
    return request.headers?.authorization?.replace('Bearer ', '') || '';
  }

  async use(request: Request, response: Response, next: NextFunction) {
    const authHeader = AuthGuard.parseAuthToken(request);
    request.user = await this.authService.parseUserFromToken(authHeader);
    next();
  }
}
