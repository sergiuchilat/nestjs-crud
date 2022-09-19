import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRegisterDto } from '../auth/dto/user.register.dto';
import { UserRegisterResponseDto } from '../auth/dto/user.register.response.dto';
import { hash } from 'bcrypt';
import { UserRole } from './roles/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneOrFail({
      where: {
        email: email,
      },
    });
  }

  async create(user: UserRegisterDto): Promise<UserRegisterResponseDto> {
    //console.log(user);
    user.password = await hash(user.password, 12);
    return this.userRepository.save({
      name: 'John',
      email: user.email,
      password: user.password,
      role: UserRole.USER,
    });
  }
}
