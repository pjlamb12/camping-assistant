import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TRIPS_FEATURE_KEY, TripsState, tripsAdapter } from './trips.reducer';

// Lookup the 'Trips' feature state managed by NgRx
export const getTripsState =
	createFeatureSelector<TripsState>(TRIPS_FEATURE_KEY);

const { selectAll, selectEntities } = tripsAdapter.getSelectors();

export const getTripsLoaded = createSelector(
	getTripsState,
	(state: TripsState) => state.loaded
);

export const getTripsError = createSelector(
	getTripsState,
	(state: TripsState) => state.error
);

export const getAllTrips = createSelector(getTripsState, (state: TripsState) =>
	selectAll(state)
);

export const getTripsEntities = createSelector(
	getTripsState,
	(state: TripsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
	getTripsState,
	(state: TripsState) => state.selectedId
);

export const getSelected = createSelector(
	getTripsEntities,
	getSelectedId,
	(entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
