import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('user')
export class UserController {
  @Get()
  getUsers(@Query('name') name: string) {
    const users = [
      { id: 1, name: 'Tola' },
      { id: 2, name: 'John' },
    ];

    if (name) {
      return users.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase()),
      );
    }

    return users;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return {
      id,
      name: 'Tola',
    };
  }

  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return {
      data: CreateUserDto,
      message: 'Create user success',
    };
  }

  @Put()
  updateUser(@Param(':id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return {
      data: UpdateUserDto,
      message: 'Update user success',
    };
  }
}
