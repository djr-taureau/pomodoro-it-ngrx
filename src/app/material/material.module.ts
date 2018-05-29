import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {CdkTableModule} from '@angular/cdk/table';
import {
  MatSnackBarModule,
  MatNativeDateModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatCheckboxModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatSnackBarModule,
    CdkTableModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule
  ],
  exports: [
    MatSnackBarModule,
    CdkTableModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule
  ],
})
export class MaterialModule {}
