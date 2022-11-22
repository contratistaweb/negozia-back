import { Module } from '@nestjs/common';
import { PostsModule } from './modules/posts/posts.module';
import { config } from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import configuration from './modules/configuration/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import Configuration from './modules/configuration/configuration';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventMailModule } from './modules/event-mail/event-mail.module';

config();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: Configuration().mongoUri,
          connectionFactory: (connection) => {
            const pluginOptions = {
              overrideMethods: 'all',
            };
            connection.plugin(require('mongoose-delete'), pluginOptions);
            return connection;
          },
        };
      },
    }),
    EventEmitterModule.forRoot(),
    EventMailModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
