import gulp from 'gulp';
import browserSync from 'browser-sync';

import { paths } from './gulp/config/paths.js';
import { clean } from './gulp/tasks/clean.js';

import { htmlFilesInclude } from './gulp/tasks/html-include.js';
import { htmlMinify } from './gulp/tasks/html-minify.js';

import { styles } from './gulp/tasks/styles.js';
import { stylesBackend } from './gulp/tasks/styles-backend.js';

import { scripts } from './gulp/tasks/scripts.js';
import { scriptsBackend } from './gulp/tasks/scripts-backend.js';

import { assets } from './gulp/tasks/assets.js';

import { images } from './gulp/tasks/images.js';
import { svgSprites } from './gulp/tasks/svg-sprite.js';
import { webpImages } from './gulp/tasks/webp-images.js';
import { avifImages } from './gulp/tasks/avif-images.js';

import { cacheFiles } from './gulp/tasks/cache-files.js';
import { rewriteFiles } from './gulp/tasks/rewrite-files.js';
import { zipFiles } from './gulp/tasks/zip-files.js';

global.app = {
  gulp,
  isProduction: process.argv.includes('--build'),
  paths,
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: `${app.paths.base.build}`
    },
    notify: false,
    port: 3000,
  });
  gulp.watch(`${app.paths.htmlLayoutFolder.src}/*.html`, htmlFilesInclude);
  gulp.watch(`${app.paths.base.src}/*.html` , htmlFilesInclude);
  gulp.watch(app.paths.javascriptFolder.src, scripts);
  gulp.watch(app.paths.stylesFolder.src, styles);
  gulp.watch(`${app.paths.assetsFolder.src}/**`, assets);
  gulp.watch(`${app.paths.imagesFolder.src}/**/**.{jpg,jpeg,png,svg}`, images);
  gulp.watch(`${app.paths.imagesFolder.src}/**/**.{jpg,jpeg,png}`, webpImages);
  gulp.watch(`${app.paths.imagesFolder.src}/**/**.{jpg,jpeg,png}`, avifImages);
  gulp.watch(app.paths.svgSpritesFolder.src, svgSprites);
};

const dev = gulp.series(clean, htmlFilesInclude, scripts, styles, assets, images, svgSprites, webpImages, avifImages, watchFiles);
const build = gulp.series(clean, htmlFilesInclude, scripts, styles, assets, images, svgSprites, webpImages, avifImages, htmlMinify);
const backend = gulp.series(clean, htmlFilesInclude, scriptsBackend, assets, svgSprites, webpImages, avifImages, stylesBackend);
const cache = gulp.series(cacheFiles, rewriteFiles);
const zip = zipFiles;

export { dev }
export { build }
export { backend }
export { cache }
export { zip }

gulp.task('default', dev);