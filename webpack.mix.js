const mix = require('laravel-mix');

mix.js('src/app.ts', 'dist')
   .sass('src/assets/main.scss', 'dist')
   .setPublicPath('dist');