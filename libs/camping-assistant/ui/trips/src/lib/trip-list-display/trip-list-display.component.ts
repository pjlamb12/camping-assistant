import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
} from '@angular/core';
import { Trip } from '@camping-assistant/camping-assistant/data-access/trips';

@Component({
	selector: 'ca-trip-list-display',
	templateUrl: './trip-list-display.component.html',
	styleUrls: ['./trip-list-display.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripListDisplayComponent implements OnInit {
	@Input() trips!: Trip[];
	constructor() {}

	ngOnInit(): void {}
}
