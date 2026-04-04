
import { src, dest, watch, series} from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

// ======================
// COPIAR HTML PRINCIPAL
// ======================
export function html(done) {
    src('index.html').pipe(dest('build'));
    done();
}



// ======================
// IMÁGENES
// ======================
export function images() {
    return src('src/img/**/*', { encoding: false }).pipe(dest('build/img'));
}

// ======================
// DATA JSON
// ======================
export function data(done) {
    src('src/data/**/*').pipe(dest('build/data'));
    done();
}

// ======================
// JS
// ======================
export function js(done) {
    src('src/js/**/*.js').pipe(dest('build/js'));
    done();
}

// ======================
// CSS
// ======================
export function css(done) {
    src('src/scss/app.scss', { sourcemaps: true })
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('build/css', { sourcemaps: true }));
    done();
}
// ======================
// DEV WATCH
// ======================
export function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
    watch('index.html', html);
    watch('src/img/**/*', images);
    watch('src/data/**/*', data);
}

// ======================
// BUILD FINAL
// ======================
export const build = series(html, images, data, js, css);
export default series(build, dev);