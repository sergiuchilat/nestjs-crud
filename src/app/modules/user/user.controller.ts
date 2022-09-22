import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  Delete,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { AdminRegisterDto } from './dto/admin.register.dto';
import { UserRegisterResponseDto } from '../auth/dto/user.register.response.dto';
import { UserService } from './user.service';
import { RolesGuard } from './roles/roles.decorator';
import { UserRole } from './roles/role.enum';
import { Request, Response } from 'express';
import { UserItemDto } from './dto/user.item.dto';
import { CountryItemDto } from '../geo/country/dto/country.item.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { UserUpdatePasswordDto } from './dto/user.update.password.dto';
import { plainToInstance } from 'class-transformer';
import { User } from './user.entity';

@ApiTags('Users')
@Controller('/users')
//@UseFilters(AllExceptionsFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @RolesGuard(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get List of users' })
  @ApiOkResponse({
    description: 'List of users',
    type: UserItemDto,
    isArray: true,
  })
  async getAll(@Res() response: Response) {
    try {
      response.status(HttpStatus.OK).json(await this.userService.getAll());
    } catch (e) {
      console.log(e);
    }
  }

  @Patch('update-own-password')
  @RolesGuard(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update own password' })
  @ApiParam({ name: 'id', description: 'User id', type: 'number' })
  @ApiOkResponse({
    description: 'Updated own password',
    type: UserUpdatePasswordDto,
    isArray: true,
  })
  async updateOwnPassword(
    @Body() value: UserUpdatePasswordDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    console.log('here');
    response
      .status(HttpStatus.OK)
      .send(await this.userService.updateOwnPassword(value, request.user));
  }

  @Get(':id')
  @RolesGuard(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get one user by Id' })
  @ApiParam({ name: 'id', description: 'User id', type: 'number' })
  @ApiOkResponse({
    description: 'User item',
    type: UserItemDto,
    isArray: false,
  })
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    response.status(HttpStatus.OK).send(await this.userService.getOneById(id));
  }

  @Post('create-admin')
  @ApiOperation({ summary: 'Create admin' })
  @ApiOkResponse({
    description: 'Registered user',
    type: UserRegisterResponseDto,
  })
  async registerUser(@Body() user: AdminRegisterDto) {
    return this.userService.createAdmin(user);
  }

  @Patch(':id')
  @RolesGuard(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update user by Id' })
  @ApiParam({ name: 'id', description: 'User id', type: 'number' })
  @ApiOkResponse({
    description: 'Updated user',
    type: CountryItemDto,
    isArray: true,
  })
  async update(
    @Body() updateUserDto: UserUpdateDto,
    @Param('id', ParseIntPipe) id: number,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    console.log(updateUserDto);
    response
      .status(HttpStatus.OK)
      .send(
        await this.userService.update(
          id,
          plainToInstance(User, updateUserDto),
          request.user,
        ),
      );
  }

  @Delete(':id')
  @RolesGuard(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete user by Id' })
  @ApiParam({ name: 'id', description: 'User id', type: 'number' })
  @ApiOkResponse({
    description: 'Empty response',
    type: null,
  })
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    response.status(HttpStatus.OK).send(await this.userService.delete(id));
  }

  @Patch(':id/update-password')
  @RolesGuard(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update user password' })
  @ApiParam({ name: 'id', description: 'User id', type: 'number' })
  @ApiOkResponse({
    description: 'Updated user password',
    type: UserUpdatePasswordDto,
    isArray: true,
  })
  async updatePassword(
    @Body() value: UserUpdatePasswordDto,
    @Param('id', ParseIntPipe) id: number,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    response
      .status(HttpStatus.OK)
      .send(await this.userService.updatePassword(id, value, request.user));
  }
}
