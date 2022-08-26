import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'ca-main-nav',
	templateUrl: './main-nav.component.html',
	styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
	public mobileNavOpen = false;
	constructor() {}

	ngOnInit(): void {}

	toggleMobileNav() {
		this.mobileNavOpen = !this.mobileNavOpen;
	}
}
