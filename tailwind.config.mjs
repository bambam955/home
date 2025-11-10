import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'green-dark': '#0d2818',
				'green-darker': '#0a1f12',
				'green-primary': '#00d992',
				'green-light': '#00d992',
				'green-accent': '#00d992',
				'green-subtle': '#00d992',
				'gray-dark': '#020617',
				'gray-medium': '#0f172a',
				'gray-light': '#1e293b',
				'gray-text': '#e2e8f0',
				'gray-dim': '#64748b',
			},
			fontFamily: {
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				'mono': ['JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Consolas', 'monospace'],
			},
			boxShadow: {
				'soft': '0 4px 6px -1px rgba(34, 197, 94, 0.1), 0 2px 4px -1px rgba(34, 197, 94, 0.06)',
				'soft-lg': '0 10px 15px -3px rgba(34, 197, 94, 0.1), 0 4px 6px -2px rgba(34, 197, 94, 0.05)',
			},
		},
	},
	plugins: [
        // Fix: Use ES module 'import' instead of CommonJS 'require' in .mjs file.
        typography,
    ],
}
