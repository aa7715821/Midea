const gulp = require('gulp'); //引入gulp模块  gulp对象
const html = require('gulp-minify-html') //引入压缩html的包
const css = require('gulp-clean-css') //引入压缩css的包
const fy = require('gulp-uglify') //引入压缩js的包

const sass = require('gulp-sass'); //引入编译sass的模块。
const sourcemaps = require('gulp-sourcemaps');
const plugins = require('gulp-load-plugins');

const imagemin = require('gulp-imagemin'); //压缩图片的包

const watch = require('gulp-watch'); //引入监听的模块。



// 1.新建复制压缩目录
gulp.task('copy', () => {
        return gulp.src('src/*.html').pipe(gulp.dest('dist/'));
    })
    // 2.压缩html文件  需要用到一个包 gulp-minify-html
gulp.task('html', () => {
        return gulp.src('src/*.html').pipe(html()).pipe(gulp.dest('dist/'))
    })
    //     // 3.压缩css文件   需要用到一个包 gulp-clean-css
gulp.task('css', () => {
        return gulp.src('src/css/*.css').pipe(css()).pipe(gulp.dest('dist/css/'));
    })
    //     // 3.压缩js文件   需要用到一个包 gulp-uglify
gulp.task('fy', () => {
        return gulp.src('src/js/*.js').pipe(fy()).pipe(gulp.dest('dist/js/'));
    })
    // 4.sass编译成css并且输出.map文件
gulp.task('runsass', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        })) //执行编译,compressed:压缩一行
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css/'));
});

//6.png图片的压缩
//图片压缩的插件：gulp-imagemin
gulp.task('runimg', function() {
    return gulp.src('src/images/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'));
});

//监听:
//如果将任务名称设置为default，执行任务的时候直接gulp。
gulp.task('default', function() {
    watch(['src/*.html', 'src/sass/*.scss', 'src/js/*.js', 'src/images/*.png'], gulp.parallel('html', 'runsass', 'fy', 'runimg'));
    //watch的第一个参数监听的文件的路径，第二个参数是监听运行的任务名
    //gulp.parallel() –并行运行任务 
});