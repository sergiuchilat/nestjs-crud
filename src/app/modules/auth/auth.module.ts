import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import ConfigEnv from '../../../config/config.env';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: ConfigEnv.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: 60 * Number(ConfigEnv.JWT_TOKEN_EXPIRES_IN),
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
