import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { User } from '../../models/user';
import { rxResource } from '@angular/core/rxjs-interop';
import { UserService } from '../../services/userService';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-signal-route-par',
  imports: [JsonPipe],
  templateUrl: './signal-route-par.html',
  styleUrl: './signal-route-par.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalRoutePar {
  #userService = inject(UserService);
  userId = input.required<number>();

  // rx-resource example
  protected userResource = rxResource<User, number>({
    params: this.userId,
    stream: ({ params: id }) => this.#userService.getUserById(id),
  });
}
