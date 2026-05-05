import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);

  private readonly API_URL = 'https://jsonplaceholder.typicode.com/posts';

  // We use a mock public API to demonstrate HTTP calls
  getPosts() {
    return this.http.get<Post[]>(this.API_URL);
  }

  getUserPosts(userId: number) {
    return this.http.get<Post[]>(`${this.API_URL}?userId=${userId}`);
  }
}
