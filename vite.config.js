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
                },
                {
                    name: 'marked-katex-extension',
                    var: 'markedKatex',
                    path: 'https://npm.elemecdn.com/marked-katex-extension@1.0.2/lib/index.umd.js',
                    css: 'https://npm.elemecdn.com/katex@0.16.2/dist/katex.min.css'
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
