import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { UserService } from '../../services/userService';
import { User } from '../../models/user';
import { rxResource } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-signal-input',
  imports: [JsonPipe],
  templateUrl: './signal-input.html',
  styleUrl: './signal-input.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalInput {
  #userService = inject(UserService);
  userId = input.required<number>();

  // rx-resource example
  protected userResource = rxResource<User, number>({
    params: this.userId,
    stream: ({ params: id }) => this.#userService.getUserById(id),
  });
}
