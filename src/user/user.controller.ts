import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userDto: any) {
    return await this.userService.createUser(userDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('search')
  async search(
    @Query('username') username?: string,
    @Query('minAge') minAge?: number,
    @Query('maxAge') maxAge?: number,
  ) {
    if (username) {
      return await this.userService.findByUsername(username);
    }
    return await this.userService.findByAgeRange(minAge, maxAge);
  }
}
