import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { itemsResolver } from './items-resolver';

describe('itemsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => itemsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
