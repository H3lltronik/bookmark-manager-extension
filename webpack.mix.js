const mix = require('laravel-mix');

mix.ts('src/index.tsx', 'dist')
   .sass('src/assets/main.scss', 'css')
   .react()
   .options({
      processCssUrls: false,
   })
   .setPublicPath('dist')
   .disableNotifications();

mix.copy('./browser', './dist');