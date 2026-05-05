import { computed, inject, Injectable, signal } from '@angular/core';
import { UserService } from '../services/userService';
import { User } from '../models/user';
import { httpResource } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersStore {
  private readonly userService = inject(UserService);

  //state signals private
  #users = signal<User[]>([]);
  #isLoading = signal<boolean>(false);

  // signal pubblici con observable like pattern
  // readonly users = this.#users.asReadonly();
  // readonly isLoading = this.#isLoading.asReadonly();

  //signal pubblici con resource like pattern
  readonly users = computed(() => this.#userResource.value());
  readonly isLoading = computed(() => this.#userResource.isLoading());

  // computed
  readonly hasUsers = computed(() => this.#users().length > 0);

  // Actions
  loadUsers() {
    this.#isLoading.set(true);

    this.userService.getUsers().subscribe((users) => {
      this.#users.set(users);
      this.#isLoading.set(false);
    });
  }

  #userResource = httpResource<User | undefined>(
    () => `https://jsonplaceholder.typicode.com/users/}`,
  );
  loadUsersWithResource() {
    this.#userResource.reload();
  }
}
