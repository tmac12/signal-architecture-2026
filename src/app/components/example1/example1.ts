import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { BehaviorSubject, catchError, delay, filter, finalize, of, switchMap, tap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { UserService } from '../../services/userService';

@Component({
  selector: 'app-example1',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './example1.html',
  styleUrl: './example1.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example1 {
  #userService = inject(UserService);
  userId$ = new BehaviorSubject<number | null>(null);

  isLoading = signal(false);
  error = signal<string | null>(null);

  //TODO: fare esmpio con 2 chiamate api e isLoading combinato
  //TODO: gestire input userId

  user$ = this.userId$.pipe(
    filter((id) => !!id),
    tap(() => {
      this.isLoading.set(true);
      this.error.set(null);
    }),
    switchMap((id) =>
      this.#userService.getUserById(id!).pipe(
        delay(500), // Artificial delay to show loading states
        catchError((err) => {
          this.error.set(err.message || 'Error fetching user');
          return of(null);
        }),
        finalize(() => this.isLoading.set(false)),
      ),
    ),
  );

  updateUser(id: number) {
    this.userId$.next(id);
  }
}
