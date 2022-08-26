import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'camping-assistant-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private _swUpdate: SwUpdate) {}

	ngOnInit() {
		this._swUpdate.checkForUpdate().then((update: boolean) => {
			if (update) {
				window.location.reload();
			}
		});
	}
}
