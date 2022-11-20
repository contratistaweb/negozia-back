import { Module } from '@nestjs/common';
import { PostsModule } from './modules/posts/posts.module';
import { config } from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import configuration from './modules/configuration/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose_delete from 'mongoose-delete';
import Configuration from './modules/configuration/configuration';

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
            connection.plugin(mongoose_delete, {
              overrideMethods: 'all',
            });
            return connection;
          },
        };
      },
    }),
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
