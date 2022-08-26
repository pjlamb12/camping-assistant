import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
	Trip,
	TripsService,
	TripStep,
} from '@camping-assistant/camping-assistant/data-access/trips';
import { combineLatest, map, Observable, of, switchMap, tap } from 'rxjs';

@Component({
	selector: 'camping-assistant-trip-form',
	templateUrl: './trip-form.component.html',
	styleUrls: ['./trip-form.component.scss'],
})
export class TripFormComponent implements OnInit {
	public tripData$: Observable<Trip> = combineLatest([
		this._route.params,
		this._route.queryParams,
	]).pipe(
		tap((data: any) => console.log(data)),
		switchMap(([params, queryParams]: Params[]) => {
			const id = params['id'];
			const duplicate = queryParams['duplicate'];
			const idToUse = duplicate || id;

			return id === 'new' && !duplicate
				? of({
						id: null,
						name: '',
						steps: [],
						tripType: null,
				  } as any as Trip)
				: this._trips.getTripById(+idToUse).pipe(
						map((trip: Trip) => {
							if (queryParams['duplicate']) {
								const { id, ...rest } = trip;
								console.log(rest);
								return {
									id: null,
									...rest,
								};
							}

							return {
								...trip,
							};
						})
				  );
		}),
		tap((trip: Trip) => {
			const subForms: FormGroup[] = trip.steps.map((step: TripStep) =>
				this._fb.group({
					step: [step.step, [Validators.required]],
					completed: step.completed,
				})
			);

			subForms.forEach((form: FormGroup) => {
				this.addStep(form);
			});

			this.form.patchValue({
				id: trip.id,
				name: trip.name,
				tripType: trip.tripType,
			});
		})
	);
	public form: FormGroup = this._fb.group({
		id: null,
		name: ['', [Validators.required]],
		tripType: [null, [Validators.required]],
		steps: this._fb.array([], Validators.required),
	});

	get steps() {
		return this.form.controls['steps'] as FormArray;
	}

	constructor(
		private _route: ActivatedRoute,
		private _trips: TripsService,
		private _fb: FormBuilder,
		private _router: Router
	) {}

	ngOnInit(): void {}

	addStep(ctrl?: FormGroup) {
		if (ctrl) {
			this.steps.push(ctrl);
		} else {
			this.steps.push(
				this._fb.group({
					step: ['', [Validators.required]],
					completed: false,
				})
			);
		}
	}

	removeStep(index: number) {
		this.steps.removeAt(index);
	}

	submitForm() {
		const { id, ...rest } = this.form.value;

		if (id) {
			this._trips.updateTrip({ id, ...rest }).subscribe(() => {
				this._router.navigateByUrl('/trips');
			});
		} else {
			this._trips.addTrip({ ...rest }).subscribe(() => {
				this._router.navigateByUrl('/trips');
			});
		}
	}
}
