import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './models/post.model';
import { EventEmitter2 } from '@nestjs/event-emitter';

interface ModelExt<T> extends Model<T> {
  createNewPost: (createPostDto: CreatePostDto) => PostDocument;
  findAllPost: () => PostDocument[];
  findOnePost: (id: string) => PostDocument;
  postUpdate: (id: string, updatePostDto: UpdatePostDto) => PostDocument;
  postDelete: (_id: Types.ObjectId) => void;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: ModelExt<PostDocument>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   *
   * @param createPostDto
   */
  async create(createPostDto: CreatePostDto) {
    const post = await this.postModel.createNewPost(createPostDto);
    this.eventEmitter.emit('post.created', post);
    return post;
  }

  async findAll() {
    return this.postModel.findAllPost();
  }

  async findOne(id: string) {
    const post = await this.postModel.findOnePost(id);
    if (!post) {
      throw new ConflictException('Post not Found.');
    } else {
      return post;
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    await this.findOne(id);
    return this.postModel.postUpdate(id, updatePostDto);
  }

  async remove(id: string) {
    const postExist = await this.findOne(id);
    if (postExist.deleted) {
      throw new ConflictException('Post not Found.');
    } else {
      return this.postModel.postDelete(postExist.id);
    }
  }
}
