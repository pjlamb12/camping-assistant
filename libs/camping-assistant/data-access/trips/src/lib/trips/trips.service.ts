import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, of, tap } from 'rxjs';
import { TripType } from './trip-type.enum';
import { Trip } from './trip.interface';

@Injectable({
	providedIn: 'root',
})
export class TripsService {
	constructor(private _db: NgxIndexedDBService) {}

	getAllTrips(): Observable<Trip[]> {
		return this._db.getAll<Trip>('trips');
	}

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
		console.log('adding trip');
		return this._db.add('trips', trip);
	}

	updateTrip(trip: Trip) {
		return this._db.update('trips', trip);
	}

	getTripById(id: number): Observable<Trip> {
		return this._db.getByKey<Trip>('trips', id);
	}
}
