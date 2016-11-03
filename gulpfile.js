const babelify = require("babelify")
const browserify = require("browserify")
const connect = require("gulp-connect")
const eslint = require("gulp-eslint")
const gulp = require("gulp")
const source = require("vinyl-source-stream")
const sourcemaps = require("gulp-sourcemaps")

const P = {
	"app": "./src",
	"allJs": "./src/**/*.{js,jsx}",
	"jsx": "./src/**/*.jsx",
	"html": "./src/**/*.{htm,html}",
	"assets": "./src/assets",
	"vendor": "./src/assets/vendor",
	"ignore": "!./src/assets/**/*.*",
}

gulp.task("lint", () => {
	return gulp.src([
				P.allJs,
				P.ignore
			])
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError())
})

gulp.task("build", ["lint"], () => {
	browserify({
		entries: "./src/index.jsx",
		extensions: [".jsx", ".js"],
		debug: true
	})
	.transform(babelify)
	.bundle()
	.pipe(source("bundle.js"))
	.pipe(gulp.dest(P.assets));
})

gulp.task("connect", ["build"], () => {
	connect.server({
		"root": "./src",
		"livereload": {
			"port": 2345
		},
		"port": 1234
	})
})

gulp.task("livereload", () => {
	gulp.src([P.allJs, P.html, P.ignore])
		.pipe(connect.reload())
})

gulp.task("watch", () => {
	gulp.watch([P.allJs, P.html, P.ignore], ["build", "livereload"])
})

gulp.task("dev", ["connect", "watch"])

gulp.task("default", ["build"], () => {
	console.log("Ran default job...")
});