import { defineConfig } from 'vite';
import { resolve } from 'path'
import { URL, fileURLToPath } from 'url';

export default defineConfig({
    root: resolve(__dirname, 'src/app'),
    build: {
        outDir: resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: [
            { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
            { find: '@styles', replacement: fileURLToPath(new URL('./src/app/styles', import.meta.url)) },
            { find: '@pages', replacement: fileURLToPath(new URL('./src/pages', import.meta.url)) },
            { find: '@partials', replacement: fileURLToPath(new URL('./src/shared/partials', import.meta.url)) },
        ]
    }
})