import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CampingAssistantUiTripsModule } from '@camping-assistant/camping-assistant/ui/trips';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { TripListComponent } from './trip-list/trip-list.component';

@NgModule({
	imports: [
		CommonModule,
		CampingAssistantUiTripsModule,
		RouterModule.forChild([
			{ path: ':id', component: TripDetailComponent },
			{ path: '', component: TripListComponent },
		]),
		ReactiveFormsModule,
	],
	declarations: [TripListComponent, TripDetailComponent],
})
export class CampingAssistantFeatureTripsModule {}
