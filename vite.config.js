import { defineConfig } from 'vite';
import { resolve } from 'path'
import { URL, fileURLToPath } from 'url';

export default defineConfig({
    root: resolve(__dirname, 'src/app'),
    base: '/',
    build: {
        outDir: resolve(__dirname, 'dist'),
    },
    publicDir: resolve('./public'),
    resolve: {
        alias: [
            { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
            { find: '@styles', replacement: fileURLToPath(new URL('./src/shared/styles', import.meta.url)) },
            { find: '@pages', replacement: fileURLToPath(new URL('./src/pages', import.meta.url)) },
            { find: '@partials', replacement: fileURLToPath(new URL('./src/shared/partials', import.meta.url)) },
            { find: '@assets', replacement: fileURLToPath(new URL('./src/shared/assets', import.meta.url)) },
            { find: '@shared', replacement: fileURLToPath(new URL('./src/shared', import.meta.url)) },
            { find: '@widgets', replacement: fileURLToPath(new URL('./src/widgets', import.meta.url)) },
            { find: '@entities', replacement: fileURLToPath(new URL('./src/entities', import.meta.url)) },
        ],
    },
    server: {
        port: 3000,
    },
})
