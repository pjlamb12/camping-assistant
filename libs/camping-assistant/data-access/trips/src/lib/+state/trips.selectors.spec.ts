import { Trip } from '../trips/trip.interface';
import {
	tripsAdapter,
	TripsPartialState,
	initialTripsState,
} from './trips.reducer';
import * as TripsSelectors from './trips.selectors';

describe('Trips Selectors', () => {
	const ERROR_MSG = 'No Error Available';
	const getTripsId = (it: Trip) => it.id;
	const createTrip = (id: string, name = '') =>
		({
			id,
			name: name || `name-${id}`,
		} as Trip);

	let state: TripsPartialState;

	beforeEach(() => {
		state = {
			trips: tripsAdapter.setAll(
				[
					createTrip('PRODUCT-AAA'),
					createTrip('PRODUCT-BBB'),
					createTrip('PRODUCT-CCC'),
				],
				{
					...initialTripsState,
					selectedId: 'PRODUCT-BBB',
					error: ERROR_MSG,
					loaded: true,
				}
			),
		};
	});

	describe('Trips Selectors', () => {
		it('getAllTrips() should return the list of Trips', () => {
			const results = TripsSelectors.getAllTrips(state);
			const selId = getTripsId(results[1]);

			expect(results.length).toBe(3);
			expect(selId).toBe('PRODUCT-BBB');
		});

		it('getSelected() should return the selected Entity', () => {
			const result = TripsSelectors.getSelected(state) as Trip;
			const selId = getTripsId(result);

			expect(selId).toBe('PRODUCT-BBB');
		});

		it('getTripsLoaded() should return the current "loaded" status', () => {
			const result = TripsSelectors.getTripsLoaded(state);

			expect(result).toBe(true);
		});

		it('getTripsError() should return the current "error" state', () => {
			const result = TripsSelectors.getTripsError(state);

			expect(result).toBe(ERROR_MSG);
		});
	});
});
