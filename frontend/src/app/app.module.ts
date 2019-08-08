import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './form/form.component';
import { LoadingComponent } from './loading/loading.component';
import { ResultComponent } from './result/result.component';
import { MaterialModule } from './shared/material.module';
import { EstimationService } from './shared/services/estimation.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BackgroundComponent } from './background/background.component';
import { environment } from 'src/environments/environment';

import { EstimationServiceMock } from '@service/estimation.service.mock';

@NgModule({
  declarations: [AppComponent, FormComponent, LoadingComponent, ResultComponent, BackgroundComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule, HttpClientModule],
  providers: [
    {
      provide: EstimationService,
      useFactory: estimationServiceFactory,
      deps: [HttpClient]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function estimationServiceFactory(http: HttpClient) {
  if (environment.useMock) {
    return new EstimationServiceMock(http);
  } else {
    return new EstimationService(http);
  }
}
