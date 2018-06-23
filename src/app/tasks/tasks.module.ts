// import { PomoTrackerComponent } from './pomo-tracker/pomo-tracker.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from './components';
import { BrowserModule } from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskEffects } from './effects/task';
import { PomoEffects } from './effects/pomo';
import { CollectionEffects } from './effects/collection';
import { TaskExistsGuard } from './guards/task-exists';
import { FindTaskPageComponent } from './containers/find-task-page';
import { ViewTaskPageComponent } from './containers/view-task-page';
import { SelectedTaskPageComponent, PomoDialogComponent } from './containers/selected-task-page';
import { PomoTableSortComponent } from '../tasks/pomo-table-sort/pomo-table-sort.component';
import { PomoTrackerComponent} from '../tasks/pomo-tracker/pomo-tracker.component';
import { TestTrackerComponent} from './components/test-tracker';
import { CollectionPageComponent } from './containers/collection-page';
import { MaterialModule } from '../material';
import {MatDialogModule} from '@angular/material/dialog';

import { reducers } from './reducers';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule.forChild([
      { path: 'find', component: FindTaskPageComponent },
      {
        path: ':id',
        component: ViewTaskPageComponent,
        canActivate: [TaskExistsGuard],
      },
      { path: '', component: CollectionPageComponent },
    ]),
    StoreModule.forFeature('tasks', reducers),
    EffectsModule.forFeature([TaskEffects, PomoEffects, CollectionEffects]),
  ],
  declarations: [
    FindTaskPageComponent,
    PomoTrackerComponent,
    PomoTableSortComponent,
    TestTrackerComponent,
    ViewTaskPageComponent,
    SelectedTaskPageComponent,
    CollectionPageComponent,
    PomoDialogComponent,

  ],
  entryComponents: [
    PomoDialogComponent,
    SelectedTaskPageComponent
  ],
  providers: [TaskExistsGuard, DatePipe],
})
export class TasksModule {}
