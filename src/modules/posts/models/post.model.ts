import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Document, Model } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post extends Model {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop()
  type: string;

  @Prop()
  tags: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
