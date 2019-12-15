const { Router } = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const compression = require('compression')
const controller = require('./utlis/createControllerRoutes')

module.exports = () => {
	const router = Router()

	router
		.use(cors())
		.use(bodyParser.json())
		.use(compression())

	router.use('/scandlines', controller('scandlines/ScandlinesController'))

	return router
}
