const Operation = require('src/app/Operation');
const fetch = require('node-fetch');

class GetTickets extends Operation {
  constructor({ }) {
    super();
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {

      fetch('https://booking.scandlines.com/api/bookings/getAvailableTickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "bookingStarterDto": {
            "outBoundRouteKey": "DKGED-DERSK",
            "outBoundRouteLocalName": "Gedser-Rostock",
            "outBoundDateTime": "2018-08-18 06:00:00",
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
        .then((response) =>  response.json())
        .then((json) => {
          this.emit(SUCCESS, json);
          json => console.log(json)
        });
    }
    catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetTickets.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetTickets;
