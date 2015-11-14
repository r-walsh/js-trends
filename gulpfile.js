var 	gulp = require('gulp')
	,	babel = require('gulp-babel')
	,	concat = require('gulp-concat')
	,	gzip = require('gulp-gzip')
	,	htmlMin = require('gulp-htmlmin')
	,	ngAnnotate = require('gulp-ng-annotate')
	,	stylus = require('gulp-stylus')
	,	uglify = require('gulp-uglify')
	,	uglifyCss = require('gulp-uglifycss')
	,	watcher = gulp.watch('./main/**/*', ['frontEndMinify', 'backEndBabel', 'stylus', 'htmlMin'])

watcher.on('change', function( event ) {
	console.log('File ' + event.path + ' was ' + event.type + ' at ' + new Date() + ' , running tasks...');
});

gulp.task('frontEndMinify', function() {
	return gulp.src('./main/public/**/*.js')
			.pipe(ngAnnotate())
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(concat('public.min.js'))
			.pipe(uglify())
			.pipe(gzip())
			.pipe(gulp.dest('./public/scripts'));
});

gulp.task('backEndBabel', function() {
	return gulp.src('./main/server/**/*.js')
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(gulp.dest('./server'));
});

gulp.task('stylus', function() {
	return gulp.src('./main/stylus/*.styl')
			.pipe(stylus())
			.pipe(uglifyCss())
			.pipe(gzip())
			.pipe(gulp.dest('./public/css'));
});

gulp.task('htmlMin', function() {
	return gulp.src('./main/views/*.html')
			.pipe(htmlMin())
			.pipe(gzip())
			.pipe(gulp.dest('./public/views'))
});

gulp.task('default', ['frontEndMinify', 'backEndBabel', 'stylus', 'htmlMin']);