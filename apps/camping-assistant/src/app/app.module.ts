import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { SharedUiComponentsModule } from '@camping-assistant/shared/ui/components';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

const routes: Routes[] = [];
@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, SharedUiComponentsModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
