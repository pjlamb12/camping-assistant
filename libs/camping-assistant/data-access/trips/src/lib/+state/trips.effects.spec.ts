import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as TripsActions from './trips.actions';
import { TripsEffects } from './trips.effects';

describe('TripsEffects', () => {
	let actions: Observable<Action>;
	let effects: TripsEffects;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [NxModule.forRoot()],
			providers: [
				TripsEffects,
				provideMockActions(() => actions),
				provideMockStore(),
			],
		});

		effects = TestBed.inject(TripsEffects);
	});

	describe('init$', () => {
		it('should work', () => {
			actions = hot('-a-|', { a: TripsActions.initTrips() });

			const expected = hot('-a-|', {
				a: TripsActions.loadTripsSuccess({ trips: [] }),
			});

			expect(effects.init$).toBeObservable(expected);
		});
	});
});
