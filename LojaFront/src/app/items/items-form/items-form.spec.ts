import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsForm } from './items-form';

describe('ItemsForm', () => {
  let component: ItemsForm;
  let fixture: ComponentFixture<ItemsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
