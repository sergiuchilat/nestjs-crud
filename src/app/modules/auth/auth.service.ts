import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginResponseDto } from './dto/user.login.response.dto';
import { UserLoginDto } from './dto/user.login.dto';
import { UserRegisterDto } from './dto/user.register.dto';
import { UserRegisterResponseDto } from './dto/user.register.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserLoginDto): Promise<UserLoginResponseDto> {
    return {
      token: this.jwtService.sign({
        username: user.email,
        sub: 1,
      }),
    };
  }

  async register(user: UserRegisterDto): Promise<UserRegisterResponseDto> {
    return await this.userService.create(user);
  }
}
