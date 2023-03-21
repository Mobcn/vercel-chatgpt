import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { Plugin as importToCDN } from 'vite-plugin-cdn-import';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
    plugins: [
        solidPlugin(),
        importToCDN({
            modules: [
                {
                    name: 'highlight.js',
                    var: 'hljs',
                    path: 'https://cdn.staticfile.org/highlight.js/11.7.0/highlight.min.js',
                    css: 'https://cdn.staticfile.org/highlight.js/11.7.0/styles/atom-one-dark.min.css'
                }
            ]
        })
    ],
    css: {
        postcss: {
            plugins: [tailwindcss, autoprefixer]
        }
    }
});
