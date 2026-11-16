import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [react(), svgr()],
		resolve: {
			tsconfigPaths: true,
		},
		css: {
			modules: {
				localsConvention: (className: string) => className,
			},
		},
		define: {
			'process.env.API_URL': JSON.stringify(env.API_URL),
			'process.env.NODE_ENV': JSON.stringify(
				mode === 'production' ? 'production' : 'development'
			),
		},
		publicDir: false,
		build: {
			outDir: 'dist-vite',
		},
	};
});
