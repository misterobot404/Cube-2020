const mix = require('laravel-mix');
const CompressionPlugin = require('compression-webpack-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

mix.webpackConfig({
    resolve: {
        // We need to define the @ in order to tell the compiler what does the @ uses for.
        extensions: ['.js', '.vue'],
        alias: {
            '@': __dirname + '/resources/js'
        }
    },
    plugins: [
        new VuetifyLoaderPlugin(),
        new CompressionPlugin({
            algorithm: 'gzip',
            compressionOptions: {level: 9},
            filename: '[path].gz[query]',
            threshold: 1400,
            minRatio: 1
        })
    ]
});

mix.js('resources/js/main.js', 'public/js').options({
        postCss: [require('autoprefixer')]
    }
);
