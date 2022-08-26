import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes } from '@angular/router';
import { SharedUiComponentsModule } from '@camping-assistant/shared/ui/components';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

const dbConfig: DBConfig = {
	name: 'camping-assistant',
	version: 1,
	objectStoresMeta: [
		{
			store: 'trips',
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [
				{ name: 'name', keypath: 'name', options: { unique: false } },
				{ name: 'steps', keypath: 'steps', options: { unique: false } },
				{
					name: 'tripType',
					keypath: 'tripType',
					options: { unique: false },
				},
			],
		},
	],
};

const routes: Routes[] = [];
@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		SharedUiComponentsModule,
		AppRoutingModule,
		NgxIndexedDBModule.forRoot(dbConfig),
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
			// Register the ServiceWorker as soon as the application is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000',
		}),
		ConfirmDialogModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
