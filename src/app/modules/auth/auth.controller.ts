import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './dto/user.login.dto';
import { UserLoginResponseDto } from './dto/user.login.response.dto';

@ApiTags('Authentication')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse({
    description: 'Bearer token',
    type: UserLoginResponseDto,
  })
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }
}
