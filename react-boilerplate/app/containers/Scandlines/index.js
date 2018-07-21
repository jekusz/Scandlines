
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import H1 from 'components/H1';
import messages from './messages';
import TicketTable from './TicketTable';
import { RESTART_ON_REMOUNT } from 'utils/constants';
import 'whatwg-fetch';


export default class Scandlines extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	// Since state and props are static,
	// there's no need to re-render this component

	componentDidMount() {
		console.log('start fetching');
		this.makeAndLogRequest()

	}

	makeAndLogRequest = () => {
		fetch('http://localhost:3500/api/scandlines', {
			method: 'GET',
		})
			.then(response => response.json())
			.then((response) => {
				console.log(response)
				this.setState({ departures: response.outboundDepartures })
			})
	}

	render() {
		console.log('rendering...')
		console.log(this.state && this.state.departures)
		var departures = this.state && this.state.departures;
		console.log(departures && departures[0].availableTickets.sort((a,b) => a.price > b.price ))
		return (
			<div>
				<Helmet>
					<title>Scandlines Page</title>
					<meta
						name="description"
						content="Feature page of React.js Boilerplate application"
					/>
				</Helmet>
				<div>
					<table>
						<tbody>
							<tr>
								<th>Firstname</th>
								<th>Lastname</th>
								<th>Age</th>
							</tr>
							{departures && departures.map((departure, index) => {
								return <tr key={index}>
									<td>{departure.departureDateTime}
									</td>
									<td>{departure.availableTickets.sort((a,b) => a.price > b.price )[0].price }
									</td>
									<td>
									</td>
								</tr>
							})}
							<tr>
								<td>Eve</td>
								<td>Jackson</td>
								<td>94</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div >
		);
	}
}
