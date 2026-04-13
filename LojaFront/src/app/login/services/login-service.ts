import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login-model';
import { first, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http: HttpClient = inject(HttpClient);
  private readonly url: string = "http://localhost:8080/user";
  private loggedIn: boolean = false;

  login(registry: LoginModel): Observable<LoginModel> {
    this.loggedIn = true;
    return this.http
      .post<LoginModel>(`${this.url}/find-email`, registry);
  }

  logout(): void {
    this.loggedIn = false;
  }

  isLogged(): boolean {
    return this.loggedIn;
  }

  save(registry: LoginModel): Observable<LoginModel> {
    return this.http.post<LoginModel>(this.url, registry).pipe(first());
  }

  delete(registry: LoginModel): Observable<LoginModel> {
    return this.login(registry).pipe(
      first(),
      switchMap((result: LoginModel): Observable<LoginModel> => {
        const id: number = result.id;
        this.logout();
        return this.http.delete<LoginModel>(`${this.url}/${id}`).pipe(first());
      }),
    );
  }
}
