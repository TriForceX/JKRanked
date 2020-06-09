import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SparklineContainer } from './sparkline-container.directive';

import { DataTablesModule } from 'angular-datatables';

import { HttpClientModule } from '@angular/common/http';
import { NaComponent } from './na/na.component';
import { SaComponent } from './sa/sa.component';
import { EuComponent } from './eu/eu.component';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    NaComponent,
    SaComponent,
    EuComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    ChartsModule
  ],
  providers: [SparklineContainer],
  bootstrap: [AppComponent]
})
export class AppModule { }
