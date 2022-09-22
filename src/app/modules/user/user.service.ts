import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRegisterDto } from '../auth/dto/user.register.dto';
import { UserRegisterResponseDto } from '../auth/dto/user.register.response.dto';
import { compare, hash } from 'bcrypt';
import { UserRole } from './roles/role.enum';
import { plainToInstance } from 'class-transformer';
import { UserItemDto } from './dto/user.item.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { UserUpdatePasswordDto } from './dto/user.update.password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<UserItemDto[]> {
    try {
      return plainToInstance(UserItemDto, await this.userRepository.find());
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async getOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneOrFail({
      where: {
        email: email,
      },
    });
  }

  async getOneById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
  }

  async createUser(user: UserRegisterDto): Promise<UserRegisterResponseDto> {
    return await this.create(user, 'user');
  }

  async createAdmin(user: UserRegisterDto): Promise<UserRegisterResponseDto> {
    return await this.create(user, 'admin');
  }

  private async create(
    user: UserRegisterDto,
    role: string,
  ): Promise<UserRegisterResponseDto> {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      throw new ConflictException();
    }
    user.password = await this.encodePassword(user.password);

    return await this.userRepository.save({
      name: 'John',
      email: user.email,
      password: user.password,
      role: UserService.detectRole(role),
    });
  }

  async update(
    id: number,
    newValue: User,
    user: any,
  ): Promise<UserUpdateDto> | undefined {
    const entity = plainToInstance(User, newValue);
    entity.updatedBy = user.id;
    await this.userRepository.update(id, entity);
    return this.getOneById(id);
  }

  async updatePassword(
    id: number,
    newValue: UserUpdatePasswordDto,
    user: any,
  ): Promise<User> | undefined {
    if (newValue.new_password !== newValue.new_password_confirmation) {
    }
    const existingUser = await this.getOneById(user.user.id);

    const oldPassword = await this.encodePassword(newValue.old_password);
    const currentPassword = existingUser.password;
    console.log(await compare(oldPassword, currentPassword));
    if (!(await compare(oldPassword, currentPassword))) {
      throw new NotFoundException();
    }

    const newPassword = await this.encodePassword(newValue.new_password);
    const entity = plainToInstance(User, {
      password: newPassword,
    });
    entity.updatedBy = user.user.id;
    await this.userRepository.update(id, entity);
    return this.getOneById(id);
  }

  async delete(id: number) {
    const user = await this.getOneById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return await this.userRepository.delete(id);
  }

  private static detectRole(role: string): UserRole {
    if (role === 'admin') {
      return UserRole.ADMIN;
    }
    if (role === 'user') {
      return UserRole.USER;
    }
  }

  async encodePassword(password: string): Promise<string> {
    return await hash(password, 12);
  }
}
