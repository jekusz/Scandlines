import React from 'react';
import moment from 'moment'

import ReactTable from "react-table";
import "react-table/react-table.css";



export default class DeparturesTable extends React.PureComponent {

renderPrice = (row) => {
	const departure = row.value
	return <div>
		{departure.availableTickets[0] && departure.availableTickets.sort((a, b) => a.price > b.price)[0].price < 70 ? "cheap " : ""}
		{departure.availableTickets[0] && departure.availableTickets.sort((a, b) => a.price > b.price)[0].price}
		</div>
}

	render() {
		const { departures } = this.props;
		return (
			<div>
				<ReactTable
					data={departures ? departures : []}
					columns={[
						{
							Header: "DateTime",
							id: 'departureDateTime',
							accessor: d => d.departureDateTime
						},
						{
							Header: "Date",
							id: 'data',
							accessor: d => moment(d.departureDateTime).format('YYYY-MM-DD')
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
							Header: 'Price',
							id: 'price',
							accessor: d => d,
							Cell: this.renderPrice
						},
					]}
					pageSize={departures && departures.length || 5}
					className="-striped -highlight"
					noDataText='Load departure data to populate table'
				/>
				<br />
			</div>
		);
	}
}

