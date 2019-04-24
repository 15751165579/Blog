const gulp = require('gulp')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const cssnano = require('cssnano')
const rename = require('gulp-rename')

const stylelint = require('stylelint')
const reporter = require('postcss-reporter')

const variables = require('postcss-css-variables')


// gulp 4.0 中不再通过模块依赖的方式
// gulp.series：按照顺序执行
// gulp.paralle：可以并行计算
gulp.task('styles', () => {
  return gulp.src('postcss/*.css')
  .pipe(postcss([
    autoprefixer
  ]))
  .pipe(sourcemaps.init())
  .pipe(sourcemaps.write('maps/'))
  .pipe(gulp.dest('dist/'))
})

gulp.task('rename', () => {
  return gulp.src('dist/*.css')
  .pipe(postcss([
    cssnano
  ]))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(sourcemaps.init())
  .pipe(sourcemaps.write('maps/'))
  .pipe(gulp.dest('dist/'))
})

gulp.task('lint-styles', () => {
  return gulp.src('postcss/*.css')
  .pipe(postcss([
    stylelint({
      'rules': {
      }
    }),
    reporter({
      clearMessages: true
    })
  ]))
})

gulp.task('default', gulp.series('lint-styles', 'styles', 'rename'))


// 变量的处理
gulp.task('variables', () => {
  return gulp.src('postcss/*.css')
    .pipe(postcss([ variables() ]))
    .pipe(gulp.dest('dist/'))
})

const watcher = gulp.watch('postcss/examples/chapter1/*.css', gulp.series('default'))

watcher.on('change', () => {
  console.log(' **** change ***')
})