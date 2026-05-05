import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, filter, tap, switchMap, delay, catchError, of, finalize } from 'rxjs';
import { UserService } from '../../services/userService';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-observable-route-par',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './observable-route-par.html',
  styleUrl: './observable-route-par.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservableRoutePar {
  #userService = inject(UserService);
  #route = inject(ActivatedRoute);

  ngOnInit(): void {
    const param = this.#route.snapshot.paramMap.get('idUser');
    const parsed = param ? parseInt(param, 10) : null;
    this.userId$.next(isNaN(parsed as number) ? null : parsed);
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
