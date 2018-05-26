import { PomoTimerService } from './services/pomo-timer';
import { PomoQueryService } from './services/pomo-query-service';
import { TodoistTasksService } from './services/todoist-tasks';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxModelModule } from 'ngx-model';
import { AppComponent } from './containers/app';
import { NotFoundPageComponent } from './containers/not-found-page';
import { LayoutComponent } from './components/layout';
import { NavItemComponent } from './components/nav-item';
import { SidenavComponent } from './components/sidenav';
import { ToolbarComponent } from './components/toolbar';
import { MaterialModule } from '../material';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, NgxModelModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [TodoistTasksService, PomoTimerService],
    };
  }
}
