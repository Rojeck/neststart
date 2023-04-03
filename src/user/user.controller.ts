import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }
  @Put('/:id')
  async updateUser(@Body() data: UpdateUserDto, @Param('id') id: string) {
    return this.userService.updateUser(data, id);
  }
  @ApiOperation({ summary: 'Get one user' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        name: 'title',
      },
    },
  })
  
  @Get('/:id')
  async getOneById(@Param('id') id: string) {
    return this.userService.getOneById(id);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        name: 'title',
      },
    },
  })
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
