/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyUI: {
		themes: [
			'{light: {...require("daisyui/src/theming/themes")["light"],primary: "#a729f5",secondary: "teal",},},',
			'{dark: {...require("daisyui/src/theming/themes")["daark"],primary: "#a729f5",secondary: "teal",},},'
		]
	}
};
