const gulp       = require('gulp');
const babelify   = require('babelify');
const browserify = require('browserify');
const sourcemaps = require('gulp-sourcemaps');
const source     = require('vinyl-source-stream');

const options = { entries: './src/index.js' };
const dependencies = ['react', 'react-dom'];

gulp.task('build', () => {
  const bundler = browserify(options);

  dependencies.forEach((dep) => bundler.external(dep));

  return bundler
    .transform('babelify')
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('dev', ['build'], () => gulp.watch('src/**/*.js', ['build']));
