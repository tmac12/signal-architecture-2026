import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { UserService } from '../../services/userService';
import { BehaviorSubject, filter, tap, switchMap, delay, catchError, of, finalize } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-observable-input',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './observable-input.html',
  styleUrl: './observable-input.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservableInput implements OnChanges {
  #userService = inject(UserService);

  @Input() idUser: string | number | null = null;

  //handle input and pass it to observable
  inputValue: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected in ObservableInput:', changes);
    if (changes['idUser']) {
      const userId = parseInt(this.idUser as string, 10);
      if (!isNaN(userId)) {
        this.userId$.next(userId);
      } else {
        this.userId$.next(null);
      }
    }
  }

  userId$ = new BehaviorSubject<number | null>(null);

  isLoading = signal(false);
  error = signal<string | null>(null);

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
}
