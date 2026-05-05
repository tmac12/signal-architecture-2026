import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/userService';
import {
  BehaviorSubject,
  filter,
  tap,
  switchMap,
  delay,
  catchError,
  of,
  finalize,
  forkJoin,
} from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { PostService } from '../../services/postService';

@Component({
  selector: 'app-observable-multiple',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './observable-multiple.html',
  styleUrl: './observable-multiple.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservableMultiple {
  #userService = inject(UserService);
  #postService = inject(PostService);
  userId$ = new BehaviorSubject<number | null>(null);

  isLoading = signal(false);
  error = signal<string | null>(null);
  //TODO: gestire input userId

  userPosts$ = this.userId$.pipe(
    filter((id) => !!id),
    tap(() => {
      this.isLoading.set(true);
      this.error.set(null);
    }),
    switchMap((id) =>
      forkJoin({
        user: this.#userService.getUserById(id!),
        posts: this.#postService.getUserPosts(id!),
      }).pipe(
        catchError((err) => {
          this.error.set(err.message || 'Error fetching data');
          return of({ user: null, posts: [] });
        }),
        finalize(() => this.isLoading.set(false)),
      ),
    ),
  );

  updateUser(id: number) {
    this.userId$.next(id);
  }
}
