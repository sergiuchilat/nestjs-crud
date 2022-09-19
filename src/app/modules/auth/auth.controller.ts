import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './dto/user.login.dto';
import { UserLoginResponseDto } from './dto/user.login.response.dto';
import { UserRegisterDto } from './dto/user.register.dto';
import { UserRegisterResponseDto } from './dto/user.register.response.dto';
import { Public } from '../../decorators/public.decorator';

@ApiTags('Authentication')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse({
    description: 'Bearer token',
    type: UserLoginResponseDto,
  })
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'User register' })
  @ApiOkResponse({
    description: 'Registered user',
    type: UserRegisterResponseDto,
  })
  async register(@Body() user: UserRegisterDto) {
    return this.authService.register(user);
  }
}
