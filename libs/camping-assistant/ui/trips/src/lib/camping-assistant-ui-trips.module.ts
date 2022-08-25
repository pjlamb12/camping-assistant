import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripListDisplayComponent } from './trip-list-display/trip-list-display.component';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [CommonModule, RouterModule],
	declarations: [TripListDisplayComponent],
	exports: [TripListDisplayComponent],
})
export class CampingAssistantUiTripsModule {}
