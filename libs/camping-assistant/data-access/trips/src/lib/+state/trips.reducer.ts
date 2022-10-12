import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { Trip } from '../trips/trip.interface';
import * as TripsActions from './trips.actions';

export const TRIPS_FEATURE_KEY = 'trips';

export interface TripsState extends EntityState<Trip> {
	selectedId?: string | number; // which Trips record has been selected
	loaded: boolean; // has the Trips list been loaded
	error?: string | null; // last known error (if any)
}

export interface TripsPartialState {
	readonly [TRIPS_FEATURE_KEY]: TripsState;
}

export const tripsAdapter: EntityAdapter<Trip> = createEntityAdapter<Trip>();

export const initialTripsState: TripsState = tripsAdapter.getInitialState({
	// set initial required properties
	loaded: false,
});

const reducer = createReducer(
	initialTripsState,
	on(TripsActions.initTrips, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(TripsActions.loadTripsSuccess, (state, { trips }) =>
		tripsAdapter.setAll(trips, { ...state, loaded: true })
	),
	on(TripsActions.loadTripsFailure, (state, { error }) => ({
		...state,
		error,
	}))
);

export function tripsReducer(state: TripsState | undefined, action: Action) {
	return reducer(state, action);
}
