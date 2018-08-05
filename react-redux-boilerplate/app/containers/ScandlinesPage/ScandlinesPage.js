/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';
import './style.scss';
import moment from 'moment'

export default class ScandlinesPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

	componentDidMount() {
		if (this.props.username && this.props.username.trim().length > 0) {
			this.props.onSubmitForm();
		}
	}

	uniqBy(a, key) {
		var seen = {};
		return a.filter(function (item) {
			var k = key(item);
			return seen.hasOwnProperty(k) ? false : (seen[k] = true);
		})
	}

	render() {
		const departures = this.props.departures
		departures && departures.sort((a, b) => {
			var check = moment(a.departureDateTime).isAfter(moment(b.departureDateTime))
			return check ? 1 : !check ? -1 : 0
		})

		console.log(departures);

		const { loading, error, repos } = this.props;
		const reposListProps = {
			loading,
			error,
			repos,
		};

		return (
			<article>
				<Helmet>
					<title>Home Page</title>
					<meta name="description" content="A React.js Boilerplate application homepage" />
				</Helmet>
				<div className="home-page">
					<section className="centered">
						<h2>Start your next react project in seconds</h2>
						<p>A minimal <i>React-Redux</i> boilerplate with all the best practices</p>
					</section>
					<section>
						<button onClick={this.props.onLoadDepartures} className='router-link'> yalla </button>
						<table>
							<tbody>
								<tr>
									<th style={{ width: '200px' }}>DateTime</th>
									<th style={{ width: '200px' }}>Date</th>
									<th style={{ width: '200px' }}>Time</th>
									<th style={{ width: '200px' }}>Weekday</th>

									<th>Price-Euros </th>
								</tr>
								{departures && departures.map((departure, index) => {
									return <tr key={index}>
										<td>
											{departure.departureDateTime}
										</td>
										<td>
											{moment(departure.departureDateTime).format('YYYY-MM-DD')}
										</td>
										<td>
											{moment(departure.departureDateTime).format('dddd')}
										</td>
										<td>
											{moment(departure.departureDateTime).format('HH:mm')}
										</td>
										<td>
											{departure.availableTickets[0] && departure.availableTickets.sort((a, b) => a.price > b.price)[0].price < 70 ? "cheap " : ""}
											{departure.availableTickets[0] && departure.availableTickets.sort((a, b) => a.price > b.price)[0].price}

										</td>
									</tr>
								})}
							</tbody>
						</table>
					</section>
				</div>
			</article>
		);
	}
}

