// Importar funciones a la API de gulp
const { src, dest, series, parallel, watch } = require('gulp');

// Importar paquetes
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

//Constantes de trabajo
const files = {
    scssPath: 'src/scss/**/*.scss',
    htmlPath: 'dist/**/*.html',
    jsPath: ''
}

function holaMundoTarea(done) {
    console.log("Holi");
    done();
}

/**
 * Compila los archivos sass en estilo cascada (CSS)
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

exports.default = series(scssTask, serveTask, watchTask);