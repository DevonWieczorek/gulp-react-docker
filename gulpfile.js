const gulp = require("gulp")
const babel = require("gulp-babel")
const concat = require("gulp-concat")
const connect = require("gulp-connect")
const eslint = require("gulp-eslint")
const newer = require("gulp-newer")
const notify = require("gulp-notify")
const plumber = require("gulp-plumber")
const sourcemaps = require("gulp-sourcemaps")

const Configs = require("./gulpconfigs.js")

const P = {
	"app": "./src",
	"allJs": "./src/**/*.{js,jsx}",
	"jsx": "./src/**/*.jsx",
	"assets": "./src/assets",
	"vendor": "./src/assets/vendor",
}

gulp.task("lint", () => {
	return gulp.src([
				P.allJs,
				"!./src/assets/**/*.js"
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
	console.log("running concat...")
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

gulp.task("watch", () => {
	console.log("now watching...")
	gulp.watch(P.allJs, ["concat"])
})

gulp.task("default", ["concat"], () => {
	console.log("Ran default job...")
});