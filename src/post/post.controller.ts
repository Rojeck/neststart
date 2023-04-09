import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { MiddlewareRequestInterface } from 'src/interfaces/middlewareRequest.interface';
import { PostService } from './post.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async createPost(
    @Body() data: CreatePostDto,
    @Req() req: MiddlewareRequestInterface,
  ) {
    const { id: authorId } = req.user;
    return this.postService.createPost(data, authorId);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async updatePost(
    @Param('id') id: string,
    @Body() data: UpdatePostDto,
    @Req() req: MiddlewareRequestInterface,
  ) {
    const { id: authorId } = req.user;
    return this.postService.updatePost(data, authorId, Number(id));
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers(@Req() req: MiddlewareRequestInterface) {
    const { id: authorId } = req.user;
    return this.postService.getAllPosts(authorId);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteUser(
    @Param('id') id: string,
    @Req() req: MiddlewareRequestInterface,
  ) {
    const { id: authorId } = req.user;
    return this.postService.deletePost(authorId, Number(id));
  }
}
