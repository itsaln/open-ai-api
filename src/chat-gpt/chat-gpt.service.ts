import { Injectable } from '@nestjs/common'
import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai'
import {
	DEFAULT_MODEL_ID,
	DEFAULT_TEMPERATURE,
	DEFAULT_MAX_TOKENS
} from '@app/config/constants'
import { ChatGptAnswerDto } from '@app/chat-gpt/dto/chat-gpt-answer.dto'
import { ChatGptSetModelDto } from '@app/chat-gpt/dto/chat-gpt-set-model.dto'

@Injectable()
export class ChatGptService {
	private readonly openAiApi: OpenAIApi
	private selectedModelId: string | undefined

	constructor() {
		const configuration = new Configuration({
			organization: process.env.ORGANIZATION_ID,
			apiKey: process.env.OPENAI_API_KEY
		})

		this.openAiApi = new OpenAIApi(configuration)
	}

	setModelId(dto: ChatGptSetModelDto) {
		this.selectedModelId = this.cleanModelId(dto.modelId)
	}

	cleanModelId(modelId: string) {
		if (modelId.includes(':')) {
			return modelId.replace(':', '-')
		}

		return modelId
	}

	async listModels() {
		try {
			const { data } = await this.openAiApi.listModels()
			console.log(data)

			return data
		} catch (e) {
			if (e.response) {
				console.log(e.response.status)
				console.log(e.response.data)
			} else {
				console.log(e.message)
			}
		}
	}

	async getModelAnswer(dto: ChatGptAnswerDto) {
		try {
			let model = DEFAULT_MODEL_ID

			if (dto.modelId) {
				model = dto.modelId
			} else if (this.selectedModelId) {
				model = this.selectedModelId
			}

			const params: CreateCompletionRequest = {
				prompt: dto.question,
				model: this.cleanModelId(model),
				temperature:
					dto.temperature != undefined ? dto.temperature : DEFAULT_TEMPERATURE,
				max_tokens: dto.maxTokens ? dto.maxTokens : DEFAULT_MAX_TOKENS
			}

			const { data } = await this.openAiApi.createCompletion(params)
			console.log(data)

			if (data.choices.length) {
				return data.choices
			}

			return data
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
