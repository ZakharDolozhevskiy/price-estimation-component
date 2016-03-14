const gulp       = require('gulp');
const babelify   = require('babelify');
const browserify = require('browserify');
const sourcemaps = require('gulp-sourcemaps');
const source     = require('vinyl-source-stream');

const options = { entries: './src/index.js' };
const dependencies = ['react', 'react-dom'];

gulp.task('build', () => {
  const bundler = browserify(options);

  browserify({ require: dependencies, debug: true, insertGlobals : true })
    .bundle()
    .pipe(source('libs.js'))
    .pipe(gulp.dest('./vendor'));

  dependencies.forEach((dep) => bundler.external(dep));

  return bundler
    .transform('babelify')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
});

const libs = ['react', 'react-dom'];

gulp.task('prod', () => {
  const b = browserify(options).transform('babelify');

  libs.forEach((lib) => b.external(lib));

  return b.bundle()
    .pipe(source('estimationWidget.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('dev', ['build'], () => gulp.watch('src/**/*.js', ['build']));
