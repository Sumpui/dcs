var gulp = require('gulp'),
    jade = require('gulp-jade'),
    clean = require('gulp-clean'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    svgSprite = require('gulp-svg-sprites'),
    svgmin = require('gulp-svgmin'),
    svg2png = require('gulp-svg2png');

gulp.task('connect', function(){
  connect.server({
    root: './public',
    port: 1337,
    livereload: true,
    })
  })

gulp.task('jade', function(){
  return gulp.src('./assets/jade/*.jade')
      .pipe(jade({pretty: false}))
      .pipe(gulp.dest('public'))
      .pipe(connect.reload());
});

gulp.task('stylus', function(){
  return gulp.src('./assets/stylus/*.styl')
      .pipe(stylus({compress: true}))
      .pipe(gulp.dest('assets/stylus/template-css/'));
});

gulp.task('concat-css', ['stylus'], function(){
  return gulp.src('assets/stylus/template-css/*.css')
            .pipe(concat('main.css'))
            .pipe(gulp.dest('public/css/'))
            .pipe(connect.reload());
});

gulp.task('concat', function(){
  return gulp.src('assets/js/modules/*.js')
            .pipe(concat('all.js'))
            .pipe(gulp.dest('./assets/js/template'));
});

gulp.task('compress', ['concat'], function(){
  return gulp.src('assets/js/template/*.js')
            .pipe(uglify({
              mangle: false,
              compress: false,
              output: {beautify: true}
            }))
            .pipe(gulp.dest('public/js'))
            .pipe(connect.reload());
});

gulp.task('clean', ['concat', 'compress'], function(){
  return gulp.src('assets/js/template', {read: false})
            .pipe(clean());
});

gulp.task('svg-sprites', ['clean-svg', 'jade'], function(){
  return gulp.src('assets/graphics/icons/svg/*.svg')
            .pipe(svgmin())
            .pipe(svgSprite({
              preview: false,
              mode: 'symbols'
            }))
            .pipe(gulp.dest('assets/jade/icons/sprite'))
});

gulp.task('clean-svg', function(){
  return gulp.src('assets/jade/icons', {read: false})
            .pipe(clean());
})

gulp.task('watch', function(){
  gulp.watch('assets/jade/**/*.jade', ['jade']);
  gulp.watch('assets/stylus/**/*.styl', ['concat-css']);
  gulp.watch('assets/js/modules/**/*.js', ['clean']),
  gulp.watch('assets/graphics/icons/svg/**/*.svg', ['svg-sprites']);
})

gulp.task('default', ['connect', 'stylus', 'concat-css', 'jade', 'concat', 'compress', 'clean', 'svg-sprites', 'watch']);