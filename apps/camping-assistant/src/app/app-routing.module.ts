import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
	{
		path: 'trips',
		loadChildren: () =>
			import('@camping-assistant/camping-assistant/feature/trips').then(
				(module) => module.CampingAssistantFeatureTripsModule
			),
	},
	{ path: '**', redirectTo: '/trips' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
