import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraComponent } from './components/camera.component';
import { UploadComponent } from './components/upload.component';
import { HttpClientModule } from '@angular/common/http'
import { WebcamModule } from 'ngx-webcam';
import { ReactiveFormsModule } from '@angular/forms';
import { CameraService } from './service/camera.service';
import { DisplayComponent } from './components/display.component';
import { DisplayService } from './service/display.service';

@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    UploadComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    WebcamModule
  ],
  providers: [CameraService, DisplayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
