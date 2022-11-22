import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailerService } from '@nestjs-modules/mailer';
import { PostDocument } from '../posts/models/post.model';

@Module({})
export class EventMailModule {
  constructor(private readonly mailService: MailerService) {}

  @OnEvent('post.created')
  handleUserCreateEvent(post: PostDocument) {
    console.log('Post handleUserCreateEvent', post);
    this.mailService
      .sendMail({
        to: 'user@example,com',
        subject: 'A new Post has published',
        template: 'new-post',
        context: {
          names: 'Petter',
          surnames: 'Perez',
          postTitle: post.title,
          imageUrl: post.images[0].imageUrl,
          url: `${process.env.SITE_URL}/`,
        },
      })
      .then((r) => console.log(r))
      .catch((error) => console.log({ error }));
  }
}
