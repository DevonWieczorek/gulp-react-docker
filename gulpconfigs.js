module.exports = {
	"plumber": {
		"errorHandler": () => {
			notify.onError({
				"title": "Error",
				"message": "<%= error %>",
			})(err)

			this.emit("end")
		}
	}
}