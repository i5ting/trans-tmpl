require('shelljs/global');

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat  = require('gulp-concat');
var minify_css = require('gulp-minify-css');

/**
 * js minify
 */ 
gulp.task('js', function() {
	gulp.src('src/*.js')
		.pipe(uglify())
		.pipe(rename(function (path) {
			path.extname = ".min.js"
		}))
		.pipe(concat('trans.min.js'))
		.pipe(gulp.dest('toc/js'));
		
	cp('-Rf', 'lib/*', 'toc/lib/');
});

/**
 * clean js && css dist
 */ 
gulp.task('clean', function() {
	rm('-rf', 'toc/css');
	rm('-rf', 'toc/js');
});


/**
 * css minify
 */ 
gulp.task('css', function() {
	rm('-rf', 'toc/css');
	
  gulp.src('css/*.css')
    .pipe(minify_css({keepBreaks:false}))
		.pipe(concat('trans.min.css'))
    .pipe(gulp.dest('toc/css'));
		
	cp('-Rf', 'css/zTreeStyle', 'toc/css/');
});



/**
 * default
 */ 
gulp.task('default', ['clean','js','css']);