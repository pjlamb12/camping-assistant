/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			variants: {
				extend: {
					backgroundColor: ['opacity'],
				},
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
