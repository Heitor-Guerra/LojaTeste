import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login-model';
import { first, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http: HttpClient = inject(HttpClient);
  private readonly url: string = "http://localhost:8080/user";

  login(registry: LoginModel): Observable<LoginModel> {
    return this.http
      .post<LoginModel>(`${this.url}/find-email`, registry);
  }

  logout(): void {
    sessionStorage.setItem("isLogged", "false");
  }

  isLogged(): boolean {
    return sessionStorage.getItem("isLogged") === "true";
  }

  save(registry: LoginModel): Observable<LoginModel> {
    return this.http.post<LoginModel>(this.url, registry).pipe(first());
  }

  delete(registry: LoginModel): Observable<LoginModel> {
    return this.login(registry).pipe(
      first(),
      switchMap((result: LoginModel): Observable<LoginModel> => {
        const id: number = result.id;
        return this.http.delete<LoginModel>(`${this.url}/${id}`).pipe(first());
      }),
    );
  }
}
