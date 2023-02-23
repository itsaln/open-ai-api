import { Module } from '@nestjs/common'
import { ChatGptService } from '@app/chat-gpt/chat-gpt.service'
import { ChatGptController } from '@app/chat-gpt/chat-gpt.controller'

@Module({
	controllers: [ChatGptController],
	providers: [ChatGptService]
})
export class ChatGptModule {}
