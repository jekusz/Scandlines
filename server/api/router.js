const { Router } = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const compression = require('compression')
const methodOverride = require('method-override')
const controller = require('./utlis/createControllerRoutes')
const swaggerMiddleware = require('./routerMiddlewares/swagger/swaggerMiddleware')
const errorHandler = require('./routerMiddlewares/errors/errorHandler')
// const loggerMiddleware = require('./routerMiddlewares/logging/loggerMiddleware')
// const statusMonitor = require('express-status-monitor')

module.exports = () => {
	const router = Router()

	/* istanbul ignore if */
	// if(process.env.NODE_ENV === 'development') {
	//   router.use(statusMonitor());
	// }

	/* istanbul ignore if */
	// if(process.env.NODE_ENV !== 'test') {
	//   router.use(loggerMiddleware);
	// }

	router
		.use(methodOverride('X-HTTP-Method-Override'))
		.use(cors())
		.use(bodyParser.json())
		.use(compression())
	// .use(containerMiddleware)
		.use('/docs', swaggerMiddleware)

	/*
   * Add your API routes here
   *
   * You can use the `controllers` helper like this:
   * apiRouter.use('/users', controller(controllerPath))
   *
   * The `controllerPath` is relative to the `interfaces/http` folder
   */

	router.use('/scandlines', controller('scandlines/ScandlinesController'))

	router.use(errorHandler)

	return router
}
