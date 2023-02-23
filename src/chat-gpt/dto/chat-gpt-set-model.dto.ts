import { IsString } from 'class-validator'

export class ChatGptSetModelDto {
	@IsString()
	modelId: string
}
