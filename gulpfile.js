const gulp  = require("gulp");
//const babel  = require("gulp-babel");
const babel = require("babelify");
const browserify  = require("browserify");
const source  = require("vinyl-source-stream");
const buffer  = require("vinyl-buffer");
const sourcemaps = require('gulp-sourcemaps');

const srcPaths = {
    content: "./src/js/content.js",
    main: "./src/js/main.js",
    src: "./src/",
    node_modules: "./node_modules"
}

const buildPaths = {
    dist: "./dist"
}


gulp.task("compileMain", () => {

  const bundler = browserify(srcPaths.main, {
    debug: true,
    paths: [srcPaths.src, srcPaths.node_modules]
  });

  return bundler
    .transform(babel, {presets: ['@babel/preset-env']})             // Compiles js, needs to happen before browserify
    .bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source('main.js'))                        // End file name
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))      // Adds onto existing sourcemaps
    //.pipe((gulpif(env.PROD == 1, uglify())))
    .pipe(sourcemaps.write('./'))                   // Adds source maps
    .pipe(gulp.dest(buildPaths.dist));
});

gulp.task("compileContent", () => {

  const bundler = browserify(srcPaths.content, {
    debug: true,
    paths: [srcPaths.src, srcPaths.node_modules]
  });

  return bundler
    .transform(babel, {presets: ['@babel/preset-env']})             // Compiles js, needs to happen before browserify
    .bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source('content.js'))                        // End file name
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))      // Adds onto existing sourcemaps
    //.pipe((gulpif(env.PROD == 1, uglify())))
    .pipe(sourcemaps.write('./'))                   // Adds source maps
    .pipe(gulp.dest(buildPaths.dist));
});

gulp.task('watch', function() {
  gulp.watch(srcPaths.main, gulp.series('compileMain'));
  gulp.watch(srcPaths.content, gulp.series('compileContent'));
});

// // gulp.task('views', function() {
// //   gulp.src(pathsSrc.views)
// //   .pipe(gulp.dest(pathsDist.views));
// // });

gulp.task('dev', gulp.parallel('compileMain', 'compileContent'));

gulp.task('default', gulp.series("dev", "watch"));


