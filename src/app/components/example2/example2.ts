import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { User } from '../../models/user';
import { httpResource } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-example2',
  imports: [JsonPipe],
  templateUrl: './example2.html',
  styleUrl: './example2.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example2 {
  userId = signal<number | null>(null);

  //TODO: verificare se è possibile gestire il parametro withAuthentication
  userResource = httpResource<User | undefined>(() =>
    this.userId() ? `https://jsonplaceholder.typicode.com/users/${this.userId()}` : undefined,
  );

  updateUser(id: number) {
    this.userId.set(id);
  }
}
