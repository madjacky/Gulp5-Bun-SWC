import gulpif from 'gulp-if';
import newer from 'gulp-newer';
import imagemin, {gifsicle, mozjpeg, optipng} from 'gulp-imagemin';

export const images = () => {
  return app.gulp.src([`${app.paths.imagesFolder.src}/**/**.{jpg,jpeg,png,svg}`], { encoding: false })
    .pipe(newer(app.paths.imagesFolder.dist))
    .pipe(gulpif(app.isProduction, imagemin([
      gifsicle({
        interlaced: true
      }),
      mozjpeg({
        quality: 75,
        progressive: true
      }),
      optipng({
        optimizationLevel: 5
      }),
    ])))
    .pipe(app.gulp.dest(app.paths.imagesFolder.dist))
};