import { TripType } from './trip-type.enum';

export interface Trip {
	id: number;
	name: string;
	steps: string[];
	tripType: TripType;
}
