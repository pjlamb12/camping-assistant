import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs';
import { Trip } from '../trips/trip.interface';
import { TripsService } from '../trips/trips.service';

import * as TripsActions from './trips.actions';
import * as TripsFeature from './trips.reducer';

@Injectable()
export class TripsEffects {
	init$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TripsActions.initTrips),
			fetch({
				run: (action) => {
					// Your custom service 'load' logic goes here. For now just return a success action...
					return this._trips
						.getAllTrips()
						.pipe(
							map((trips: Trip[]) =>
								TripsActions.loadTripsSuccess({ trips })
							)
						);
				},
				onError: (action, error) => {
					console.error('Error', error);
					return TripsActions.loadTripsFailure({ error });
				},
			})
		)
	);

	constructor(
		private readonly actions$: Actions,
		private _trips: TripsService
	) {}
}
