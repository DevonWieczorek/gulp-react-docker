const gulp = require("gulp")
const babel = require("gulp-babel")
const concat = require("gulp-concat")
const connect = require("gulp-connect")
const eslint = require("gulp-eslint")
const newer = require("gulp-newer")
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

gulp.task("copy-react", () => {
	return gulp.src("./node_modules/react/dist/react.js")
			.pipe(newer(P.vendor + "/react.js"))
			.pipe(gulp.dest(P.vendor))
})

gulp.task("copy-react-dom", () => {
	gulp.src("./node_modules/react-dom/dist/react-dom.js")
		.pipe(newer(P.vendor + "/react-dom.js"))
		.pipe(gulp.dest(P.vendor))
})

gulp.task("concat", ["lint", "copy-react", "copy-react-dom"], () => {
	return gulp.src(P.allJs)
			.pipe(sourcemaps.init())
			.pipe(babel({
				presets: ["react"],
				only: P.jsx,
				compact: false
			}))
			.pipe(concat("app.js"))
			.pipe(sourcemaps.write(P.app))
			.pipe(gulp.dest(P.assets))
})

gulp.task("connect", ["concat"], () => {
	connect.server({
		"root": "./src",
		"livereload": true,
		"port": 1234
	})
})

gulp.task("livereload", () => {
	gulp.src([P.allJs, P.html, P.ignore])
		.pipe(connect.reload())
})

gulp.task("watch", () => {
	gulp.watch([P.allJs, P.html, P.ignore], ["concat", "livereload"])
})

gulp.task("dev", ["connect", "watch"])

gulp.task("default", ["concat"], () => {
	console.log("Ran default job...")
});