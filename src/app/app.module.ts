import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AuthTokenService } from './auth/services/auth-token.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { StoreRouterConnectingModule, RouterStateSerializer, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { routes } from './routes';
import { reducers, metaReducers } from './reducers';
import { schema } from './db';
import { CustomRouterStateSerializer } from './shared/utils';
import { AppComponent } from './core/containers/app';
import { environment } from '../environments/environment';
import { NgxOAuthModule } from 'ngx-oauth-client';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { TestTableComponent } from './test-table/test-table.component';

@NgModule({
  imports: [
    NgxOAuthModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xrsf-Cookie',
      headerName: 'My-Xsrf-Header'
    }),
    RouterModule.forRoot(routes),
    RouterModule.forRoot([]),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([]),
    DBModule.provideDB(schema),
    CoreModule.forRoot(),
    AuthModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [

    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    // { provide: HTTP_INTERCEPTORS , useClass: AuthTokenService, multi: true},
  ],
  bootstrap: [AppComponent],
  declarations: [TestTableComponent],
})
export class AppModule {}
