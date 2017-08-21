"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a lical dev server
var open = require('gulp-open'); //Opern a URL in a web browser
var browserify = require('browserify'); //Bundles JS
var reactify = require('reactify'); // tranforms React JSX to JS
var source = require('vinyl-source-stream'); //Use conventional tet streams with Gulp

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html', //go to the src and find anything .html
        js: './src/**/.js',
        dist: './dist',
        mainJs: './src/main.js'
    }
}

//Start a local development server
gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function() { //when you run open, first run connect
    gulp.src('dist/index.html')
        .pipe(open({ url: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
    gulp.src(config.paths.html) //go to any html file
        .pipe(gulp.dest(config.paths.dist)) //put it to path destination
        .pipe(connect.reload()); //reload using connect

});

gulp.task('js', function() {
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console)) //if any errors, we'll se it on the console
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']); //anything sth changes, run html task
    gulp.watch(config.paths.js, ['js']); 
});

gulp.task('default', ['html', 'js', 'open', 'watch']); //each time i run gulp command 
