import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { of } from 'rxjs';
import { TripType } from './trip-type.enum';
import { Trip } from './trip.interface';

const mockPreTrips: Trip[] = [
	{
		id: 1,
		name: 'Trip 1',
		steps: ['Pack', 'Leave'],
		tripType: TripType.PreTrip,
	},
];

const mockPostTrips: Trip[] = [
	{
		id: 2,
		name: 'Trip 1',
		steps: ['Pack', 'Leave'],
		tripType: TripType.PostTrip,
	},
];

@Injectable({
	providedIn: 'root',
})
export class TripsService {
	constructor(private _db: NgxIndexedDBService) {}

	getPreTripList() {
		return this._db.getAllByIndex<Trip>(
			'trips',
			'tripType',
			IDBKeyRange.only(TripType.PreTrip)
		);
	}

	getPostTripList() {
		return this._db.getAllByIndex<Trip>(
			'trips',
			'tripType',
			IDBKeyRange.only(TripType.PostTrip)
		);
	}

	addTrip(trip: Trip) {
		return this._db.add('trips', trip);
	}

	getTripById(id: number) {
		return this._db.getByIndex('trips', 'id', id);
	}
}
