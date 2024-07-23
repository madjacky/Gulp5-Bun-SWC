import browserSync, { use } from 'browser-sync';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import webpack from 'webpack-stream';

export const scriptsBackend = () => {
  return app.gulp.src(app.paths.mainJavascriptFile.src)
    .pipe(plumber(
      notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "swc-loader",
              options: {
                sync: true,
              }
            }
          }
        ]
      },
      devtool: false
    }))
    .on('error', function (err) {
      console.error('SWC ERROR', err);
      this.emit('end');
    })
    .pipe(app.gulp.dest(app.paths.javascriptFolder.dist))
    .pipe(browserSync.stream());
};