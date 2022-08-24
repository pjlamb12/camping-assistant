import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Trip } from './trip.interface';

const mockPreTrips: Trip[] = [{ name: 'Trip 1', steps: ['Pack', 'Leave'] }];

const mockPostTrips: Trip[] = [{ name: 'Trip 1', steps: ['Pack', 'Leave'] }];

@Injectable({
	providedIn: 'root',
})
export class TripsService {
	constructor() {}

	getPreTripList() {
		return of(mockPreTrips);
	}

	getPostTripList() {
		return of(mockPostTrips);
	}
}
