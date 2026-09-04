import { Injectable } from '@nestjs/common';
import { LoggerService } from './user.logger.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(private readonly logger: LoggerService) {}

  private users: User[] = [
    { id: 1, name: 'Tola', email: 'tola@gmail.com' },
    { id: 2, name: 'Nara', email: 'nara@gmail.com' },
  ];

  findAllUsers(name: string = '') {
    this.logger.log('finding all users');
    return this.users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  findOneUser(id: number) {
    this.logger.log(`Finding User ${id}`);

    return this.users.find((user) => user.id === id) ?? null;
  }

  createUse(dto: CreateUserDto) {
    this.logger.log('Creating User');

    const newUser: User = {
      id: this.users.length + 1,
      email: '',
      ...dto,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, dto: UpdateUserDto) {
    this.logger.log(`Updating User ${id}`);

    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) return null;

    this.users[index] = {
      ...this.users[index],
      ...dto,
    };

    return this.users[index];
  }

  deleteUser(id: number) {
    this.logger.log(`Deleting User ${id}`);

    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) return null;

    const [deleted] = this.users.splice(index, 1);
    return deleted;
  }
}
