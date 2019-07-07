const path = require('path')

module.exports = function createControllerRoutes(controllerUri) {
	const controllerPath = path.resolve('server/api', controllerUri)
	const Controller = require(controllerPath)

	return Controller.router
}
