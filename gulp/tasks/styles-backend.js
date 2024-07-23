import browserSync from 'browser-sync';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import { readFileSync } from "fs";

import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import postcss from 'gulp-postcss';
import atImport from 'postcss-import';
import autoprefixer from 'autoprefixer';

export const stylesBackend = () => {
  const plugins = [
    atImport(),
    autoprefixer({
      cascade: false,
      grid: true
    })
  ];
  return app.gulp.src(app.paths.stylesFolder.src)
    .pipe(plumber(
      notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(app.gulp.dest(app.paths.stylesFolder.dist))
    .pipe(browserSync.stream());
};