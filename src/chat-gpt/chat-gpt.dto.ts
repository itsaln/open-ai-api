import { IsString } from 'class-validator'

export class ChatGptDto {
	@IsString()
	question: string

	temperature?: number
}
