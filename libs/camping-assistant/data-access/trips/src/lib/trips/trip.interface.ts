import { TripType } from './trip-type.enum';

export interface Trip {
	id: number | null;
	name: string;
	steps: TripStep[];
	tripType: TripType | null;
}

export interface TripStep {
	step: string;
	completed: boolean;
}
