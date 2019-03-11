import React from 'react';
import moment from 'moment'

import ReactTable from "react-table";
import "react-table/react-table.css";
import { BeatLoader } from 'react-spinners';
import './style.scss';

export default class DeparturesTable extends React.PureComponent {

	renderPrice = (row) => {
		const departure = row.value
		return <div>
			{departure.availableTickets[0] && departure.availableTickets.sort((a, b) => a.price > b.price)[0].price}
			{departure.availableTickets[0] && ' €' || 'sold out'}
		</div>
	}

	renderHeader = () => {
		return (<React.Fragment>
			Departures
			<BeatLoader
				className='spinner'
				sizeUnit={"px"}
				size={10}
				color={'#41ADDD'}
				loading={this.props.loadingDepartures}
			> </BeatLoader>
		</React.Fragment>)
	}

	renderAnchor = (row) => {
		return <a href = {row.value} target="_blank">
			Link
		</a>
	}

	encodeQuery = (input) => {
		const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$-=";
		if (input == null || input == "") return "";
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		do {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);

		} while (i < input.length);
		return output;
	}

	getUrlForDeparture = (departure) => {
		var query = "isreturn=false"
        query += "|vehiclecode=CAR"

        query += "|adults=1"
        query += "|children=0|infants=0"
        query += "|outroute=" + departure.route
        query += "|outschedule=" + departure.departureDateTime
        query += "|homeroute=" + departure.route
        query += "|homeschedule=" + departure.departureDateTime
		query = this.encodeQuery(query)

		const url = 'https://booking.scandlines.com/TripView?mandator=SAS&lang=da&query=' + query
		return url
	}

	addLinksToDepartures = (departures) => {
		departures.forEach(departure => {
			departure.url = this.getUrlForDeparture(departure)
		});
		return departures
	}

	render() {
		let { departures, loading } = this.props
		departures = departures && this.addLinksToDepartures(departures)

		return (
			<div>
				<ReactTable
					data={departures || []}
					columns={[
						{
							Header: this.renderHeader,
							Footer: 'yolo',
							id: 'departureDateTimetest',
							accessor: d => d.departureDateTime,
							columns: [
								{
									Header: "Date",
									id: 'data',
									accessor: d => moment(d.departureDateTime).format('DD-MMM-YYYY')
								},
								{
									Header: 'Time',
									id: 'time',
									accessor: d => moment(d.departureDateTime).format('HH:mm')
								},
								{
									Header: 'Weekday',
									id: 'weekday',
									accessor: d => moment(d.departureDateTime).format('dddd')
								},
								{
									Header: 'Lowest Price',
									id: 'price',
									accessor: d => d,
									Cell: this.renderPrice
								},
								{
									Header: 'Url',
									id: 'url',
									accessor: d => d.url,
									Cell: this.renderAnchor
								},
							]
						}
					]}
					showPageSizeOptions={false}
					showPagination={false}
					minRows={5}
					pageSize={departures && departures.length > 5 ? departures.length : 5}
					className="-striped -highlight"
					noDataText='Load departure data to populate table'
					style={{
						maxHeight: "500px" // This will force the table body to overflow and scroll, since there is not enough room
					}}
				>
				</ReactTable>
				<br />
			</div>
		);
	}
}

