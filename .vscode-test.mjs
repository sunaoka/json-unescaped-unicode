import { defineConfig } from '@vscode/test-cli';

export default defineConfig({
	files: 'out/test/**/*.test.js',
	version: process.env.CODE_VERSION ?? 'stable',
});
