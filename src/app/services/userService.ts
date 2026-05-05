import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private readonly API_URL = 'https://jsonplaceholder.typicode.com/users';

  // We use a mock public API to demonstrate HTTP calls
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL).pipe(
      delay(500), // Artificial delay to show loading states
    );
  }

  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}?q=${query}`).pipe(delay(500));
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`).pipe(delay(500));
  }
}
