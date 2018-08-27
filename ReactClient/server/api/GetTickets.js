const Operation = require('src/app/Operation');
const fetch = require('node-fetch');
var moment = require('moment');

class GetTickets extends Operation {
	constructor({ }) {
		super();
	}

	requestData(postData, SUCCESS, ERROR) {

		var requestedDateTime = moment();
		requestedDateTime.set('year',postData.year);
		requestedDateTime.set('month',postData.month);
		requestedDateTime.set('date',postData.day);
		requestedDateTime.set('hour',postData.hour)
		requestedDateTime.set('minute',postData.minute)
		requestedDateTime.set('second',postData.second)

		var aggregatedResponse = [];

		var fetchNow = () => {
			var scandilinesFormattedTime = requestedDateTime.format('YYYY-MM-DD HH:mm:ss');
			fetch('https://booking.scandlines.com/api/bookings/getAvailableTickets', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"bookingStarterDto": {
						"outBoundRouteKey": "DKROF-DEPUT", //DKROF-DEPUT  DKGED-DERSK
						"outBoundRouteLocalName": "Gedser-Rostock",
						"outBoundDateTime": scandilinesFormattedTime,
						"homeBoundRouteLocalName": "",
						"homeBoundRouteKey": "DEPUT-DKROF", //DEPUT-DKROF  DERSK-DKGED
						"homeBoundDateTime": "2018-08-18 02:00:00",
						"numberOfpersons": 1,
						"isReturn": false,
						"vehicleKey": "CAR",
						"vehicleLocalName": "Bil",
						"vehicleLength": 5,
						"marketingSpecialOfferReference": null,
						"expressLinkId": null,
						"vehicleDisplayName": "Bil op til 6 m"
					},
					"showEarlier": false,
					"initialSearch": true
				})
			})
				.then((response) => response.json())
				.then((json) => {
						aggregatedResponse.push(json)
						this.emit(SUCCESS, (aggregatedResponse));
					})
		}

		fetchNow();

	}

	async execute(postData) {
		const { SUCCESS, ERROR } = this.outputs;

		try {
			this.requestData(postData, SUCCESS, ERROR)
		}
		catch (error) {
			this.emit(ERROR, error);
		}
	}
}

GetTickets.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetTickets;
