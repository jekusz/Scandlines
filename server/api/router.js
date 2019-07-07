const { Router } = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const compression = require('compression')
const methodOverride = require('method-override')
const controller = require('./utlis/createControllerRoutes')

module.exports = () => {
	const router = Router()

	router
		.use(methodOverride('X-HTTP-Method-Override'))
		.use(cors())
		.use(bodyParser.json())
		.use(compression())

	router.use('/scandlines', controller('scandlines/ScandlinesController'))

	return router
}
