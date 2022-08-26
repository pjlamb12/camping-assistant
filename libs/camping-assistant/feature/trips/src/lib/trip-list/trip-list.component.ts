import { Component, OnInit } from '@angular/core';
import {
	TripsService,
	Trip,
} from '@camping-assistant/camping-assistant/data-access/trips';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TripType } from 'libs/camping-assistant/data-access/trips/src/lib/trips/trip-type.enum';
import { map, Observable } from 'rxjs';

@UntilDestroy()
@Component({
	selector: 'camping-assistant-trip-list',
	templateUrl: './trip-list.component.html',
	styleUrls: ['./trip-list.component.scss'],
})
export class TripListComponent implements OnInit {
	public trips$: Observable<{ preTrips: Trip[]; postTrips: Trip[] }> =
		this.initTrips();

	constructor(private _trips: TripsService) {}

	ngOnInit(): void {}

	private initTrips() {
		return this._trips.getAllTrips().pipe(
			map((trips: Trip[]) => {
				const preTrips = trips.filter(
					(trip: Trip) => trip.tripType === TripType.PreTrip
				);
				const postTrips = trips.filter(
					(trip: Trip) => trip.tripType === TripType.PostTrip
				);

				return {
					preTrips,
					postTrips,
				};
			})
		);
	}

	handleDeleteTrip(id: number) {
		this._trips
			.deleteTrip(id)
			.pipe(untilDestroyed(this))
			.subscribe(() => {
				this.trips$ = this.initTrips();
			});
	}
}
