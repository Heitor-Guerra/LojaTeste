import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LoginService } from './services/login-service';
import { ConfirmDialog } from '../shared/confirm-dialog/confirm-dialog/confirm-dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInput, MatButton],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private dialog: MatDialog = inject(MatDialog);
  private service: LoginService = inject(LoginService);


  errorMessage: WritableSignal<string> = signal("Not a valid email");

  formGroup: FormGroup = this.formBuilder.group({
    email: new FormControl<string>("", [Validators.email, Validators.required]),
    password: new FormControl<string>("", { nonNullable: true }),
  });

  onSubmit(): void {
    this.service.login(this.formGroup.value).subscribe({
      next: () => this.router.navigate(["/items"]).then(),
      error: () => this.snackBar.open("Invalid Email or password", "", {
        duration: 5000,
      }),
    });
  }

  onRegister(): void {
    console.log("Registering an user");
    this.service.save(this.formGroup.value).subscribe({
      next: (): void => {
        this.snackBar.open("User registered sucessfully", "", {
          duration: 5000,
        });
      },
      error: (err: any): void => {
        console.log(err);
        this.snackBar.open("E-mail already registered", "", {
          duration: 5000,
        });
      },
    });
  }

  onDelete(): void {
    console.log("Deleting user");
    const dialog: MatDialogRef<ConfirmDialog> = this.dialog.open(ConfirmDialog);

    dialog.afterClosed().subscribe((result: any): void => {
      if (result) {
        this.service.delete(this.formGroup.value).subscribe({error: (err: string): void =>
          {
            console.log(err);
            this.snackBar.open("Wrong credentials", "", {
              duration: 5000,
            });
          },
        });
        this.snackBar.open("User deleted sucessfully", "", {
          duration: 5000,
        });
        console.log("User deleted");
      }
    });
  }
}
