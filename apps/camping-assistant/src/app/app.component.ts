import { Component, OnInit } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ConfirmationService } from 'primeng/api';
import { filter, tap } from 'rxjs';

@UntilDestroy()
@Component({
	selector: 'camping-assistant-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [ConfirmationService],
})
export class AppComponent implements OnInit {
	constructor(
		private _swUpdate: SwUpdate,
		private _confirmation: ConfirmationService
	) {}

	ngOnInit() {
		if (this._swUpdate.isEnabled) {
			this._swUpdate.versionUpdates.pipe(
				filter(
					(evt): evt is VersionReadyEvent =>
						evt.type === 'VERSION_READY'
				),
				tap(() => {
					this.showUpdateConfirmDialog();
				}),
				untilDestroyed(this)
			);
		}
	}

	showUpdateConfirmDialog() {
		this._confirmation.confirm({
			message: 'A new version is available. Update?',
			accept: () => {
				window.location.reload();
			},
		});
	}
}
