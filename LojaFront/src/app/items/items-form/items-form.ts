import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemsService } from '../services/items-service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemsModel } from '../models/items-model';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-items-form',
  imports: [
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatCardActions,
    MatToolbar,
    MatCardModule,
  ],
  templateUrl: './items-form.html',
  styleUrl: './items-form.scss',
})
export class ItemsForm {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private service: ItemsService = inject(ItemsService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private snackbar: MatSnackBar = inject(MatSnackBar);
  private location: Location = inject(Location);

  form: FormGroup = this.formBuilder.group({
    id: new FormControl<number>(0, { nonNullable: true }),
    name: new FormControl<string>('', { nonNullable: true }),
    brand: new FormControl<string>('', { nonNullable: true }),
    description: new FormControl<string>('', { nonNullable: true }),
    price: new FormControl<number>(0, { nonNullable: true }),
  });

  constructor() {
    const item: ItemsModel = this.route.snapshot.data['item'];
    this.form.setValue({
      id: item.id,
      name: item.name,
      brand: item.brand,
      description: item.description,
      price: item.price,
    });
  }

  onSubmit(): void {
    this.service.save(this.form.value).subscribe({
      next: () => this.snackbar.open('Item salvo com Sucesso', '', { duration: 5000 }),
      error: () => this.snackbar.open('Houve um erro', '', { duration: 5000 }),
    });
  }

  onCancel(): void {
    this.location.back();
  }
}
