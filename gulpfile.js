// Importar funciones a la API de gulp
const { src, dest, series, parallel, watch } = require('gulp');

// Importar paquetes
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const minifycss = require('gulp-minify-css');

const gulp = require("gulp");

const { reload } = require('browser-sync');

const concat = require('gulp-concat');


//Constantes de trabajo
const files = {
    scssPath: 'src/scss/**/*.scss',
    htmlPath: 'dist/**/*.html',
    jsPath: 'dist/**/*.js',
    cssPath: 'dist/**/*.css'
}

function holaMundoTarea(done) {
    console.log("Holi");
    done();
}

/**
 * Compila los archivos sass en  (CSS)
 */
function scssTask() {
    return src(files.scssPath)
        .pipe(sass())
        .pipe(dest('dist/css'));
}

/**
 * Observa los cambios en archivos sass y los compila automáticamente
 */
function watchTask() {
    watch(
        [files.scssPath, files.htmlPath],
        series(scssTask, reloadTask)
    )
}

function serveTask(d) {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });
    d();
}

function reloadTask(d) {
    browserSync.reload();
    d();
}

/* 
 * Minificación de archivos CSS
 */
function minifycssTask(d) {
    return src(files.cssPath)
        .pipe(concat('minificado.css'))
        .pipe(minifycss())
        .pipe(dest('dist/css/'))
}

/**
 * Minificación de archivos js
 */
function minifyjsTask(d) {
    return src(files.jsPath)
        .pipe(concat('minificado.js'))
        .pipe(uglify())
        .pipe(dest('dist/js/'))
}

exports.default = series(scssTask, minifycssTask, serveTask, watchTask);