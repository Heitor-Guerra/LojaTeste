import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { ItemsModel } from './models/items-model';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ItemsService } from './services/items-service';

import { MatTableDataSource } from '@angular/material/table';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { ConfirmDialog } from '../shared/confirm-dialog/confirm-dialog/confirm-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-items',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatTableModule,
    MatSortModule,
    MatPaginator,
    MatIconModule,
    MatButtonModule,
    CurrencyPipe,
    MatCardModule,
    MatToolbar,
  ],
  templateUrl: './items.html',
  styleUrl: './items.scss',
})
export class Items implements AfterViewInit{
  dataSource: MatTableDataSource<ItemsModel> = new MatTableDataSource<ItemsModel>([]);
  displayedColumns: string[] = ['name', 'brand', 'price', 'expand', 'actions'];
  expandedElement: ItemsModel | null = null;

  private service: ItemsService = inject(ItemsService);
  private dialog: MatDialog = inject(MatDialog);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.refresh();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // --------------- Table functions ----------------- //

  private refresh(): void {
    this.service.findAll().subscribe({
      next: (result: ItemsModel[]): void => {
        this.dataSource.data = result;
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue: string = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // --------------- Expand functions ----------------- //

  isExpanded(element: ItemsModel): boolean {
    return this.expandedElement === element;
  }

  toggle(element: ItemsModel): void {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }

  // --------------- Buttons functions ----------------- //

  onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.route }).then();
  }

  onEdit(item: ItemsModel): void {
    this.router.navigate(['edit', item.id], { relativeTo: this.route }).then();
  }

  onDelete(id: number): void {
    const dialog: MatDialogRef<ConfirmDialog> = this.dialog.open(ConfirmDialog);

    dialog.afterClosed().subscribe((result: any): void => {
      if (result) {
        this.service.delete(id).subscribe({
          next: (): void => {
            this.snackBar.open('Usuário deletado com sucesso', '', {
              duration: 5000,
            });
            this.refresh();
          },
          error: (err: string): void => {
            console.log(err);
            this.snackBar.open('Ocorreu algum problema', '', {
              duration: 5000,
            });
          },
        });
      }
    });
  }
}
