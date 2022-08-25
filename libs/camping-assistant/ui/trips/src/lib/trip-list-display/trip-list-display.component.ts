import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import {
	Trip,
	TripStep,
} from '@camping-assistant/camping-assistant/data-access/trips';

interface ExtendedTrip extends Trip {
	isComplete: boolean;
}

@Component({
	selector: 'ca-trip-list-display',
	templateUrl: './trip-list-display.component.html',
	styleUrls: ['./trip-list-display.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripListDisplayComponent implements OnChanges {
	@Input() trips!: Trip[];
	public extendedTrips: ExtendedTrip[] = [];
	constructor() {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['trips']) {
			this.extendedTrips = this.trips.map((trip: Trip) => {
				return {
					...trip,
					isComplete: trip.steps.every(
						(step: TripStep) => step.completed === true
					),
				};
			});
		}
	}
}
