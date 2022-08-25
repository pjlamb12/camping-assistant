import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CampingAssistantUiTripsModule } from '@camping-assistant/camping-assistant/ui/trips';
import { TripFormComponent } from './trip-form/trip-form.component';
import { TripListComponent } from './trip-list/trip-list.component';

@NgModule({
	imports: [
		CommonModule,
		CampingAssistantUiTripsModule,
		RouterModule.forChild([
			{ path: 'add/:id', component: TripFormComponent },
			{ path: 'edit/:id', component: TripFormComponent },
			{ path: '', component: TripListComponent },
		]),
		ReactiveFormsModule,
	],
	declarations: [TripListComponent, TripFormComponent],
})
export class CampingAssistantFeatureTripsModule {}
