// import our required modules
import gulp from 'gulp';
import babel from 'gulp-babel';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import connect from 'gulp-connect';

// GULP is a task-runner - we'll set up tasks that we need it to action
// Move HTML files accross
gulp.task('copyHTML', () => {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'));
});

// optimise images
gulp.task('imageMin', () => {
    gulp.src('./src/images/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
});

// compile sass
gulp.task('sass', () => {
    gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
});

// compile (and minify!) all js into our distribution bundle
gulp.task('scripts', () => {
    gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
})

// spin up a basic development server
gulp.task('serve', () => {
  connect.server({ root: 'dist' });
});

// set up 'watchers' so we can make file changes and have these trigger GULP updates
gulp.task('watch', () => {
    gulp.watch(['./src/*.*','./src/**/*.*'], ['update']) //watching all files -> run the 'update' task on change
});

// we'll declare all the tasks we'll need to run onChange
gulp.task('update', [    
    'copyHTML', 'imageMin', 'sass', 'scripts'
])

// we can finish by defining a 'default' task that will fire our chain of tasks
gulp.task('default', [
    'update', 'serve', 'watch'
]);