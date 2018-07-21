const Operation = require('src/app/Operation');
const fetch = require('node-fetch');
var moment = require('moment');

class GetTickets extends Operation {
	constructor({ }) {
		super();
	}

	requestData(SUCCESS, ERROR) {

		var requestedDateTime = moment();
		requestedDateTime.add(14, 'd');
		requestedDateTime.hour(1)
		requestedDateTime.minute(0)
		requestedDateTime.seconds(0)

		var time = requestedDateTime.format('YYYY-MM-DD HH:mm:ss');

		var aggregatedResponse = [];

		var fetchNow = () => {
			fetch('https://booking.scandlines.com/api/bookings/getAvailableTickets', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"bookingStarterDto": {
						"outBoundRouteKey": "DKGED-DERSK",
						"outBoundRouteLocalName": "Gedser-Rostock",
						"outBoundDateTime": requestedDateTime.format('YYYY-MM-DD HH:mm:ss'),
						"homeBoundRouteLocalName": "",
						"homeBoundRouteKey": "DERSK-DKGED",
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
					console.log(json)
					aggregatedResponse.push(json)
					console.log(aggregatedResponse);
					this.emit(SUCCESS, aggregatedResponse);

					if (requestedDateTime.isAfter('2018-09-01')) {
					}
					else {
						now.add(8, 'd')
						//fetchNow();
					}
				});
		}
	}

	async execute() {
		const { SUCCESS, ERROR } = this.outputs;

		try {

			this.requestData(SUCCESS, ERROR)
		}
		catch (error) {
			this.emit(ERROR, error);
		}
	}
}

GetTickets.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetTickets;
