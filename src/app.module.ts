import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { ChatModule } from './chat/chat.module';
import { NotChatModule } from './not-chat/not-chat.module';

@Module({
  imports: [UserModule, AuthModule, PostModule, ChatModule, NotChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
