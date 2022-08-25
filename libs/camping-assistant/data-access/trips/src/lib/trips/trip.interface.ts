import { TripType } from './trip-type.enum';

export interface Trip {
	id: number | null;
	name: string;
	steps: string[];
	tripType: TripType | null;
}
