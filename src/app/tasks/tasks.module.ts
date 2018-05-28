// import { PomoTrackerComponent } from './pomo-tracker/pomo-tracker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from './components';
import { TaskEffects } from './effects/task';
import { PomoEffects } from './effects/pomo';
import { CollectionEffects } from './effects/collection';
import { TaskExistsGuard } from './guards/task-exists';
import { FindTaskPageComponent } from './containers/find-task-page';
import { ViewTaskPageComponent } from './containers/view-task-page';
import { SelectedTaskPageComponent, PomoDialogComponent } from './containers/selected-task-page';
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
    // PomoTrackerComponent,
    ViewTaskPageComponent,
    SelectedTaskPageComponent,
    CollectionPageComponent,
    PomoDialogComponent
  ],
  entryComponents: [
    PomoDialogComponent,
    SelectedTaskPageComponent
  ],
  providers: [TaskExistsGuard],
})
export class TasksModule {}
