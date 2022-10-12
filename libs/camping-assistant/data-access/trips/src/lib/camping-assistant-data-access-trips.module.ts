import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTrips from './+state/trips.reducer';
import { TripsEffects } from './+state/trips.effects';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(
			fromTrips.TRIPS_FEATURE_KEY,
			fromTrips.tripsReducer
		),
		EffectsModule.forFeature([TripsEffects]),
	],
})
export class CampingAssistantDataAccessTripsModule {}
