import { Injectable } from '@nestjs/common'
import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai'
import { ChatGptDto } from '@app/chat-gpt/chat-gpt.dto'

const DEFAULT_MODEL_ID = 'text-davinci-003'
const DEFAULT_TEMPERATURE = 0.9

@Injectable()
export class ChatGptService {
	private readonly openAiApi: OpenAIApi

	constructor() {
		const configuration = new Configuration({
			organization: process.env.ORGANIZATION_ID,
			apiKey: process.env.OPENAI_API_KEY
		})

		this.openAiApi = new OpenAIApi(configuration)
	}

	async getModelAnswer(dto: ChatGptDto) {
		try {
			const params: CreateCompletionRequest = {
				model: DEFAULT_MODEL_ID,
				prompt: dto.question,
				temperature:
					dto.temperature != undefined ? dto.temperature : DEFAULT_TEMPERATURE
			}

			const response = await this.openAiApi.createCompletion(params)
			console.log(response.data)

			return response.data
		} catch (e) {
			if (e.response) {
				console.log(e.response.status)
				console.log(e.response.data)
			} else {
				console.log(e.message)
			}
		}
	}
}
