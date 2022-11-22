import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Document, Model } from 'mongoose';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Image } from '../interfaces/image.interface';

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
  tags: string;

  @Prop()
  images: Image[];
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.statics.createNewPost = function (createPostDto: CreatePostDto) {
  const newPost = this.create(createPostDto);
  return newPost;
};

PostSchema.statics.findAllPost = function () {
  const postList = this.find().sort({ createdAt: -1 });
  return postList;
};

PostSchema.statics.findOnePost = function (id: string) {
  const post = this.findOne({ id });
  return post;
};

PostSchema.statics.postUpdate = function (
  id: string,
  updatePostDto: UpdatePostDto,
) {
  const post = this.findOneAndUpdate({ id }, updatePostDto);
  return post;
};

PostSchema.statics.postDelete = function (id) {
  return this.updateOne({ id }, { deleted: true });
};
