import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PostService } from '../../services/postService';
import { UserService } from '../../services/userService';
import { User } from '../../models/user';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { Post } from '../../models/post';

@Component({
  selector: 'app-rx-resource-demo',
  imports: [JsonPipe],
  templateUrl: './rx-resource-demo.html',
  styleUrl: './rx-resource-demo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxResourceDemo {
  #userService = inject(UserService);
  #postService = inject(PostService);
  userId = signal(1);

  protected userResource = rxResource<User[], void>({
    stream: () => this.#userService.getUsers(),
  });

  protected userResourceById = rxResource<User, number>({
    params: this.userId,
    stream: ({ params: id }) => this.#userService.getUserById(id),
  });

  protected userPostsResource = rxResource<{ user: User; posts: Post[] }, number>({
    params: this.userId,
    stream: ({ params: id }) => {
      return forkJoin({
        user: this.#userService.getUserById(id),
        posts: this.#postService.getUserPosts(id),
      });
    },
  });

  nextUser() {
    this.userId.update((id) => id + 1);
  }
}
