import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { SharedUiComponentsModule } from '@camping-assistant/shared/ui/components';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

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
		SharedUiComponentsModule,
		AppRoutingModule,
		NgxIndexedDBModule.forRoot(dbConfig),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
