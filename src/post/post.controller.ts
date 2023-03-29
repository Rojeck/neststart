import { Controller, Get } from '@nestjs/common';
import { Body, Delete, Param, Post, Put } from '@nestjs/common/decorators';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAll() {
    return this.postService.getAll();
  }
  @Post()
  async createPost(@Body() dto: CreatePostDto) {
    return this.postService.createPost(dto);
  }
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.postService.getById(id);
  }
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.postService.deleteById(id);
  }
  @Put(':id')
  async updateById(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.postService.updateById(id, dto);
  }
}
