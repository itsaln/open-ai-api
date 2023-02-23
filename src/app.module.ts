import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from '@app/app.controller'
import { AppService } from '@app/app.service'
import { ChatGptModule } from '@app/chat-gpt/chat-gpt.module'

@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [ConfigModule.forRoot(), ChatGptModule]
})
export class AppModule {}
