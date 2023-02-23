import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ChatGptService } from '@app/chat-gpt/chat-gpt.service'
import { ChatGptAnswerDto } from '@app/chat-gpt/dto/chat-gpt-answer.dto'
import { ChatGptSetModelDto } from '@app/chat-gpt/dto/chat-gpt-set-model.dto'

@Controller('chat-gpt')
export class ChatGptController {
	constructor(private readonly chatGptService: ChatGptService) {}

	@Get('/model')
	@UsePipes(new ValidationPipe())
	listModels() {
		return this.chatGptService.listModels()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('/message')
	getModelAnswer(@Body() dto: ChatGptAnswerDto) {
		return this.chatGptService.getModelAnswer(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('/model')
	setModel(@Body() dto: ChatGptSetModelDto) {
		return this.chatGptService.setModelId(dto)
	}
}
