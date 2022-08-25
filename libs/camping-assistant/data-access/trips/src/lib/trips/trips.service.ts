import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, of } from 'rxjs';
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

	getPreTripList(): Observable<Trip[]> {
		return this._db.getAllByIndex<Trip>(
			'trips',
			'tripType',
			IDBKeyRange.only(TripType.PreTrip)
		);
	}

	getPostTripList(): Observable<Trip[]> {
		return this._db.getAllByIndex<Trip>(
			'trips',
			'tripType',
			IDBKeyRange.only(TripType.PostTrip)
		);
	}

	addTrip(trip: Trip) {
		return this._db.add('trips', trip);
	}

	getTripById(id: number): Observable<Trip> {
		return this._db.getByIndex<Trip>('trips', 'id', id);
	}
}
