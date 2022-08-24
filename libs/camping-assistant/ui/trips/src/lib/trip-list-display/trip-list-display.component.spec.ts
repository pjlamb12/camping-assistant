import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripListDisplayComponent } from './trip-list-display.component';

describe('TripListComponent', () => {
	let component: TripListDisplayComponent;
	let fixture: ComponentFixture<TripListDisplayComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TripListDisplayComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TripListDisplayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
