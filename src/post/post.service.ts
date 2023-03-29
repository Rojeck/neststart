import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  posts: any[];
  constructor() {
    this.posts = [
      { id: 1, content: 'text' },
      { id: 2, content: 'text' },
      { id: 3, content: 'text' },
      { id: 4, content: 'text' },
      { id: 5, content: 'text' },
      { id: 6, content: 'text' },
    ];
  }

  async getAll() {
    return this.posts;
  }

  async createPost(dto: CreatePostDto) {
    return [...this.posts, dto];
  }

  async getById(id: string) {
    const post = this.posts.find((post) => post.id === Number(id));
    return post;
  }

  async deleteById(id: string) {
    const post = this.posts.filter((post) => post.id !== Number(id));
    return post;
  }

  async updateById(id: string, dto: UpdatePostDto) {
    const post = this.posts.find((post) => post.id === Number(id));
    post.content = dto.content;
    post.username = dto.username;
    return post;
  }
}
