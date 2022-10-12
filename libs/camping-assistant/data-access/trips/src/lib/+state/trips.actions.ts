import { createAction, props } from '@ngrx/store';
import { Trip } from '../trips/trip.interface';

export const initTrips = createAction('[Trips Page] Init');

export const loadTripsSuccess = createAction(
	'[Trips/API] Load Trips Success',
	props<{ trips: Trip[] }>()
);

export const loadTripsFailure = createAction(
	'[Trips/API] Load Trips Failure',
	props<{ error: any }>()
);
