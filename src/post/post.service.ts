import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  getAllPosts(userId: number): Promise<Post[]> {
    return this.prismaService.post.findMany({
      where: { authorId: userId },
    });
  }

  createPost(data: CreatePostDto, authorId: number): Promise<Post> {
    return this.prismaService.post.create({
      data: {
        content: data.content,
        author: {
          connect: { id: authorId },
        },
      },
    });
  }

  async updatePost(
    postData: Prisma.PostUpdateInput,
    userId: number,
    postId: number,
  ): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      include: { author: true },
    });

    // Check if the post exists and if the author ID matches
    if (!post || post.authorId !== userId) {
      throw new Error('Post not found or invalid author');
    }
    return this.prismaService.post.update({
      where: { id: postId },
      data: { content: postData.content },
    });
  }

  async deletePost(userId: number, postId: number): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      include: { author: true },
    });

    // Check if the post exists and if the author ID matches
    if (!post || post.authorId !== userId) {
      throw new Error('Post not found or invalid author');
    }
    return this.prismaService.post.delete({
      where: { id: postId },
    });
  }
}
