import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import {
	Trip,
	TripsService,
	TripStep,
} from '@camping-assistant/camping-assistant/data-access/trips';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, switchMap, tap } from 'rxjs';

@UntilDestroy()
@Component({
	selector: 'camping-assistant-trip-detail',
	templateUrl: './trip-detail.component.html',
	styleUrls: ['./trip-detail.component.scss'],
})
export class TripDetailComponent implements OnInit {
	public trip$: Observable<Trip> = this._route.params.pipe(
		switchMap((params: Params) => {
			return this._trips.getTripById(+params['id']);
		}),
		tap((trip: Trip) => {
			const { steps, ...rest } = trip;
			this.form.patchValue({ ...rest });
			const subForms: FormGroup[] = steps.map((step: TripStep) =>
				this._fb.group({
					step: step.step,
					completed: step.completed,
				})
			);

			subForms.forEach((subForm: FormGroup) => {
				this.steps.push(subForm);
			});
		})
	);
	public form: FormGroup = this._fb.group({
		id: null,
		name: '',
		tripType: null,
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

	ngOnInit(): void {
		this.form.valueChanges
			.pipe(
				tap((values) => {
					this._trips.updateTrip(values).subscribe();
				}),
				untilDestroyed(this)
			)
			.subscribe();
	}
}
