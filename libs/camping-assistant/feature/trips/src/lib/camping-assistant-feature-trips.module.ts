import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CampingAssistantUiTripsModule } from '@camping-assistant/camping-assistant/ui/trips';
import { TripListComponent } from './trip-list/trip-list.component';

@NgModule({
	imports: [
		CommonModule,
		CampingAssistantUiTripsModule,
		RouterModule.forChild([{ path: '', component: TripListComponent }]),
	],
	declarations: [TripListComponent],
})
export class CampingAssistantFeatureTripsModule {}
