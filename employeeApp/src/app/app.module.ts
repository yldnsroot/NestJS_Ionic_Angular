import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Import HTTP client and interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor'; // Import the AuthInterceptor

@NgModule({
  declarations: [AppComponent],
  imports: [    
    BrowserModule,
    HttpClientModule, // Ensure HttpClientModule is imported to make HTTP requests
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Add the interceptor here
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
