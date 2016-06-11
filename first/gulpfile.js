var gulp = require('gulp');
var webserver = require('gulp-webserver');
var url = require('url');
var fs = require('fs');
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
// var minifyHTML = require('gulp-minify-html');

// 1.设定服务器
gulp.task('webserver', function() {
  gulp.src('www')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      middleware: function(req,res,next){
      	var urlObj = url.parse(req.url, true),
      	method = req.method;

      	switch (urlObj.pathname) {
			case '/api/skill.json':
				res.setHeader('Content-Type', 'application/json');
				fs.readFile('src/mock/skill.json', 'utf-8', function(err, data) {
					res.end(data);
				});
				return;
			case '/api/work.json':
				res.setHeader('Content-Type', 'application/json');
				fs.readFile('sec/mock/work.json', 'utf-8', function(err, data) {
					res.end(data);
				});
			return;
			case '/api/project.json':
				res.setHeader('Content-Type', 'application/json');
				fs.readFile('src/mock/project.json', 'utf-8', function(err, data) {
					res.end(data);
				});
			return;
			default:
				;
			}//end switch
		next();
      }// end  middleware
    }));// end webserver
});//end task


// 2.复制index.html
gulp.task('copy-index',function(){
	gulp.src('src/index.html').pipe(gulp.dest('./www'));

});


// 3.打包js
var jsFiles = [
	'src/js/index.js',
	'src/js/zepto.min.js',
	'src/js/swiper.animate1.0.2.min.js',
	'src/js/swiper.jquery.min.js'
];
gulp.task('packjs',function(){
	return gulp.src(jsFiles)
		.pipe(gulp.dest('./www/js'));
});

// 打包css
var cssFiles = [
	'src/css/animate.min.css',
	'src/css/font-awesome.min.css',
	'src/css/swiper.min.css'
];
gulp.task('packcss',function(){
	return gulp.src(cssFiles)
		.pipe(gulp.dest('./www/css'));
});
// 打包图片
gulp.task('images',function(){
	return gulp.src('src/images/**/*').pipe(gulp.dest('www/images'));

});

// 打包字库
gulp.task('font',function(){
	return gulp.src('src/font/**/*').pipe(gulp.dest('www/font'));
});


gulp.task('mp3',function(){
	gulp.src('src/mp3/**/*').pipe(gulp.dest('./www/mp3'));
});

gulp.task('mock',function(){
	gulp.src('src/mock/**/*').pipe(gulp.dest('./www/mock'));
});

// css模块化
gulp.task('sass', function () {
  return gulp.src('./src/css/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./www/css'));
});


var cssDistFiles = [
	'www/css/style.css'
]
var jsDistFiles = [
	'www/js/index.js'
]
gulp.task('ver',function(){
	gulp.src(cssDistFiles)
		.pipe(rev())
		.pipe(gulp.dest('www/css'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('www/ver/css'))

	gulp.src(jsDistFiles)
		.pipe(rev())
		.pipe(gulp.dest('www/js'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('www/ver/js'));
});

// gulp.task('html', function() {
// 	gulp.src(['www/ver/**/*.json', 'www/*.html'])
// 		.pipe(revCollector({replaceReved:true}))
// 		.pipe(gulp.dest('www/'));
// });

  // 监听
gulp.task('watch', function() {
	gulp.watch('src/index.html', ['copy-index']);
	gulp.watch('src/js/**/*',['packjs','ver']);
	gulp.watch('src/css/**/*',['sass','ver']);
});

// 最后执行前面所有的任务
gulp.task('default',['webserver','watch','packcss','packjs','images','font','copy-index','sass','mp3','mock']);