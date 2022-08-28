const mix = require('laravel-mix');

mix.ts('src/index.tsx', 'dist')
   .sass('src/assets/main.scss', 'dist')
   .react()
   .setPublicPath('dist');

mix.copy('./browser', './dist');