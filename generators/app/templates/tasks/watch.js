import browserSync from 'browser-sync';
import gulp from 'gulp';

const bs = browserSync.create('server');

gulp.task('watch', () =>
  <% if (wp.changeFileStructure) { %>
  gulp.watch('app/themes/**/*').on('change', bs.reload)
  <% } else { %>
  gulp.watch('app/wp-content/themes/**/*').on('change', bs.reload)
  <% } %>
);
