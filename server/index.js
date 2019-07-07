
const express = require('express')
const logger = require('./util//logger')
const http = require('http')
const argv = require('./util/argv')
const port = require('./util//port')
const frontEndSetup = require('./middlewares/frontendMiddleware')
const { resolve } = require('path')
const router = require('./api/router')
const expressServer = express()

// const loggerMiddleware = require('./api/routerMiddlewares/logging/loggerMiddleware')
// const errorHandler = require('./api/routerMiddlewares/errors/errorHandler')
// const swaggerMiddleware = require('./api/routerMiddlewares/swagger/swaggerMiddleware')


// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// expressServer.use('/api', myApi);

const expressRouter = router()

expressServer.use('/api', expressRouter)

// In production we need to pass these values in instead of relying on webpack
frontEndSetup(expressServer, {
	outputPath: resolve(process.cwd(), 'build'),
	publicPath: '/',
})

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST
const host = customHost || null // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost'

// Start your app.
expressServer.listen(port, host, (err) => {
	if (err) {
		return logger.error(err.message)
	}
	logger.appStarted(port, prettyHost)

})

setInterval(function () {
	try {
		http.get('http://scandegrator.herokuapp.com/')
	}
	catch (err) {
		console.log(err)
	}

}, 300000) // every 5 minutes (300000)
