import { Action } from '@ngrx/store';

import * as TripsActions from './trips.actions';
import { Trip } from '../trips/trip.interface';
import { TripsState, initialTripsState, tripsReducer } from './trips.reducer';

describe('Trips Reducer', () => {
	const createTrip = (id: string, name = ''): Trip => ({
		id,
		name: name || `name-${id}`,
	});

	describe('valid Trips actions', () => {
		it('loadTripsSuccess should return the list of known Trips', () => {
			const trips = [
				createTrip('PRODUCT-AAA'),
				createTrip('PRODUCT-zzz'),
			];
			const action = TripsActions.loadTripsSuccess({ trips });

			const result: TripsState = tripsReducer(initialTripsState, action);

			expect(result.loaded).toBe(true);
			expect(result.ids.length).toBe(2);
		});
	});

	describe('unknown action', () => {
		it('should return the previous state', () => {
			const action = {} as Action;

			const result = tripsReducer(initialTripsState, action);

			expect(result).toBe(initialTripsState);
		});
	});
});
