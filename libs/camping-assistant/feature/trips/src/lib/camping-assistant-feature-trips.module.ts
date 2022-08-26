import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CampingAssistantUiTripsModule } from '@camping-assistant/camping-assistant/ui/trips';
import { TripFormComponent } from './trip-form/trip-form.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripDetailComponent } from './trip-detail/trip-detail.component';

@NgModule({
	imports: [
		CommonModule,
		CampingAssistantUiTripsModule,
		RouterModule.forChild([
			{ path: 'add/:id', component: TripFormComponent },
			{ path: 'copy/:id', component: TripFormComponent },
			{ path: 'edit/:id', component: TripFormComponent },
			{ path: 'view/:id', component: TripDetailComponent },
			{ path: '', component: TripListComponent },
		]),
		ReactiveFormsModule,
	],
	declarations: [TripListComponent, TripFormComponent, TripDetailComponent],
})
export class CampingAssistantFeatureTripsModule {}
