import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, Observable } from 'rxjs';

import { ItemsModel } from '../models/items-model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private http: HttpClient = inject(HttpClient);
  private readonly url: string = "http://localhost:8080/items";

  private update(registry: ItemsModel): Observable<ItemsModel> {
    return this.http.put<ItemsModel>(`${this.url}/${registry.id}`, registry).pipe(first());
  }

  private create(registry: ItemsModel): Observable<ItemsModel> {
    return this.http.post<ItemsModel>(this.url, registry).pipe(first());
  }

  save(registry: ItemsModel): Observable<ItemsModel> {
    if(registry.id != 0) {
      return this.update(registry);
    }
    return this.create(registry);
  }

  delete(id: number): Observable<ItemsModel> {
    return this.http.delete<ItemsModel>(`${this.url}/${id}`).pipe(first());
  }

  findAll(): Observable<ItemsModel[]> {
    return this.http.get<ItemsModel[]>(this.url).pipe(first());
  }

  findById(id: number): Observable<ItemsModel> {
    return this.http.get<ItemsModel>(`${this.url}/${id}`).pipe(first());
  }
}
