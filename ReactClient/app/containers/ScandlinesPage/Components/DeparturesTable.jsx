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
				loading={this.props.loading}
			> </BeatLoader>
		</React.Fragment>)
	}

	render() {
		const { departures, loading } = this.props
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
									Header: 'Lowest Price',
									id: 'price',
									accessor: d => d,
									Cell: this.renderPrice
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

