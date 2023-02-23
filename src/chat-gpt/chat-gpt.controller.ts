import { Body, Controller, Post } from '@nestjs/common'
import { ChatGptService } from '@app/chat-gpt/chat-gpt.service'
import { ChatGptDto } from '@app/chat-gpt/chat-gpt.dto'

@Controller('chat-gpt')
export class ChatGptController {
	constructor(private readonly chatGptService: ChatGptService) {}

	@Post('/message')
	getModelAnswer(@Body() dto: ChatGptDto) {
		return this.chatGptService.getModelAnswer(dto)
	}
}
