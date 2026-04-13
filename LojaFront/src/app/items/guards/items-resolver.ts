import { ResolveFn } from '@angular/router';
import { ItemsService } from '../services/items-service';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ItemsModel } from '../models/items-model';

export const itemsResolver: ResolveFn<Observable<ItemsModel>> = (route, state) => {
  const itemsService: ItemsService = inject(ItemsService);
  if(route.params && route.params["id"]) {
    return itemsService.findById(route.params["id"]);
  }
  return of({id: 0, name: "", brand: "", description: "", price: 0});
};
