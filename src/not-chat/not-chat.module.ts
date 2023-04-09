import { Module } from '@nestjs/common';
import { NotChatService } from './not-chat.service';

@Module({
  providers: [NotChatService]
})
export class NotChatModule {}
