const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const concat = require('gulp-concat'); 

gulp.task('control_common',function(){
    gulp.src([
        './start.js',          //数组内文件按顺序执行
        './index.js'
    ])
    .pipe(concat('common.min.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('nodemon',function(cb){
    var started = false;
    return nodemon({
        script: 'start.js'
    }).on('start',function(){
        if(!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('dev',['control_common','nodemon'],function(){
    console.log('------项目构建完成--------');
    gulp.watch('./index.js',['control_common','nodemon']);
});