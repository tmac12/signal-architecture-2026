import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserService } from '../../services/userService';
import { PostService } from '../../services/postService';
import { User } from '../../models/user';
import { httpResource } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-http-resource',
  imports: [JsonPipe],
  templateUrl: './http-resource.html',
  styleUrl: './http-resource.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HttpResourceComponent {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/users';

  protected usersResource = httpResource<User[]>(() => `${this.API_URL}`);
}
