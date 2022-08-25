import { Component, OnInit } from '@angular/core';
import {
	TripsService,
	Trip,
} from '@camping-assistant/camping-assistant/data-access/trips';
import { Observable } from 'rxjs';

@Component({
	selector: 'camping-assistant-trip-list',
	templateUrl: './trip-list.component.html',
	styleUrls: ['./trip-list.component.scss'],
})
export class TripListComponent implements OnInit {
	public trips$: Observable<Trip[]> = this._trips.getPreTripList();
	public postTrips$: Observable<Trip[]> = this._trips.getPostTripList();

	constructor(private _trips: TripsService) {}

	ngOnInit(): void {
		this._trips.getAllTrips().subscribe((trips) => {
			console.log(trips);
		});
	}
}
