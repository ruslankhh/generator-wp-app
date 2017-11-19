import browserSync from 'browser-sync';
import gulp from 'gulp';
import php from 'gulp-connect-php';

const bs = browserSync.create('server');

gulp.task('server:php', () =>
  php.server({
		base: 'app',
    hostname: 'localhost',
		port: 8000,
		keepalive: true
	})
);

gulp.task('server:bs', ['server:php'], () =>
	bs.init({
    notify: false,
    open: true,
		port: 8080,
    proxy: 'localhost:8000',
		reloadOnRestart: true
	})
);

gulp.task('server', ['server:bs']);
