import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';

import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { MiddlewareRequestInterface } from 'src/interfaces/middlewareRequest.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImageFilter } from 'src/utils/image.filter';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Put('/')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './avatars',
        filename: (req, file, cb) => {
          return cb(null, `${file.originalname}`);
        },
      }),
      fileFilter: ImageFilter,
    }),
  )
  async updateUser(
    @Body() data: UpdateUserDto,
    @Req() req: MiddlewareRequestInterface,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    let avatarPath: string = null;
    try {
      if (avatar) {
        avatarPath = `avatar/${avatar.originalname}`;
      }
      data.avatar = avatarPath;
    } catch (error) {
      console.log(error);
    }
    const { id } = req.user;
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
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
  @UseGuards(AuthGuard)
  @Get('avatar/:image')
  async watchImage(@Param('image') image, @Res() res) {
    return res.sendFile(image, { root: './avatars/' });
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
