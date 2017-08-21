"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a lical dev server
var open = require('gulp-open'); //Opern a URL in a web browser
var browserify = require('browserify'); //Bundles JS
var reactify = require('reactify'); // tranforms React JSX to JS
var source = require('vinyl-source-stream'); //Use conventional tet streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint'); //lint JS files, including JSX

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html', //go to the src and find anything .html
        js: './src/**/*.js',
        css : [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
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
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
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

gulp.task('css', function() {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('lint', function() {
    return gulp.src(config.paths.js)
        .pipe(lint({config: 'eslint.config.json'}))
        .pipe(lint.format());
})

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']); //anything sth changes, run html task
    gulp.watch(config.paths.js, ['js', 'lint']); 
});

gulp.task('default', ['html', 'js', 'css', 'lint', 'open', 'watch']); //each time i run gulp command 
