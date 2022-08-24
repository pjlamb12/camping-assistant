import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripListDisplayComponent } from './trip-list-display/trip-list-display.component';

@NgModule({
	imports: [CommonModule],
	declarations: [TripListDisplayComponent],
	exports: [TripListDisplayComponent],
})
export class CampingAssistantUiTripsModule {}
