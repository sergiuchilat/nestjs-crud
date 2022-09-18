import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLoginDto } from '../auth/dto/user.login.dto';
import { RoleEnumType, User } from './user.entity';
import { UserRegisterDto } from '../auth/dto/user.register.dto';
import { UserRegisterResponseDto } from '../auth/dto/user.register.response.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<UserLoginDto | undefined> {
    return await this.userRepository.findOneOrFail({
      where: {
        email: username,
      },
    });
  }

  async create(user: UserRegisterDto): Promise<UserRegisterResponseDto> {
    console.log(user);
    user.password = await hash(user.password, 12);
    return this.userRepository.save({
      name: 'John',
      email: user.email,
      password: user.password,
      role: RoleEnumType.USER,
    });
  }
}
