const mix = require('laravel-mix');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('resources/js/app.ts', 'public/js')
    .vue()
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);

mix.alias({
    '@': path.join(__dirname, 'resources/js')
});

mix.webpackConfig({
    resolve: {
        extensions: [ '.vue', '.ts', '.js' ],
    },
});
