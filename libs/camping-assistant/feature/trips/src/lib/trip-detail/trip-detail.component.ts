import { Component, OnInit } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import {
	Trip,
	TripsService,
} from '@camping-assistant/camping-assistant/data-access/trips';
import { map, Observable, of, switchMap, tap } from 'rxjs';

@Component({
	selector: 'camping-assistant-trip-detail',
	templateUrl: './trip-detail.component.html',
	styleUrls: ['./trip-detail.component.scss'],
})
export class TripDetailComponent implements OnInit {
	public tripData$: Observable<Trip> = this._route.params.pipe(
		switchMap((params: Params) => {
			const defaultSteps: string[] = ['starting point'];
			return params['id'] === 'new'
				? of({
						id: null,
						name: '',
						steps: defaultSteps,
						tripType: null,
				  } as any as Trip)
				: this._trips.getTripById(params['id']);
		}),
		tap((trip: Trip) => {
			const { steps, ...rest } = trip;
			const controls: FormGroup[] = trip.steps.map((step: string) =>
				this._fb.group({ step })
			);

			controls.forEach((control: FormGroup) => {
				this.addStep(control);
			});

			// if (trip.id) {
			this.form.patchValue({
				id: trip.id,
				name: trip.name,
				tripType: trip.tripType,
				// steps: this._fb.array(controls),
			});
			// }
		})
	);
	public form: FormGroup = this._fb.group({
		id: null,
		name: ['', [Validators.required]],
		tripType: [null, [Validators.required]],
		steps: this._fb.array([]),
	});

	get steps() {
		return this.form.controls['steps'] as FormArray;
	}

	constructor(
		private _route: ActivatedRoute,
		private _trips: TripsService,
		private _fb: FormBuilder
	) {}

	ngOnInit(): void {}

	addStep(ctrl?: FormGroup) {
		if (ctrl) {
			this.steps.push(ctrl);
		} else {
			this.steps.push(this._fb.group({ step: '' }));
		}
	}

	removeStep(index: number) {
		this.steps.removeAt(index);
	}
}
