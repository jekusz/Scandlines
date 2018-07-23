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

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
	/**
	 * when initial state username is not null, submit the form to load repos
	 */
	constructor(props) {
		super(props);
		this.state = { departures: [] };
	}

	componentDidMount() {
		if (this.props.username && this.props.username.trim().length > 0) {
			this.props.onSubmitForm();
		}

		console.log('start fetching');
		for (let index = 14; index < 25; index++) {
			this.makeAndLogRequest(index)
		}

	}

	makeAndLogRequest = (day) => {
		fetch('http://localhost:3500/api/scandlines', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'year': 2018,
				'month': 8,
				'day': day,
				'hour': 1,
				'minute': 0,
				'second': 0
			})
		})
			.then(response => response.json())
			.then((response) => {
				console.log(JSON.parse(response))
				var aggregatedResponses = JSON.parse(response)
				var aggregatedDepartures = aggregatedResponses.map(response => response.outboundDepartures)
				var departures = aggregatedDepartures.flatMap(c => c)
				var allDepartures = [...this.state.departures, ...departures]

				allDepartures && this.setState({ departures: allDepartures })
			})
	}

	uniqBy(a, key) {
		var seen = {};
		return a.filter(function (item) {
			var k = key(item);
			return seen.hasOwnProperty(k) ? false : (seen[k] = true);
		})
	}

	render() {
		var uniqueDepartures = []
		if (this.state.departures) {
			uniqueDepartures = this.uniqBy(this.state.departures, JSON.stringify)
		}

		uniqueDepartures.sort((a,b) => {
			var check = moment(a.departureDateTime).isAfter(moment(b.departureDateTime))
			return check ? 1 : !check ? -1 : 0
		})

		console.log(uniqueDepartures);
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
						<table>
							<tbody>
								<tr>
									<th style={{ width: '200px' }}>DateTime</th>
									<th style={{ width: '200px' }}>Date</th>
									<th style={{ width: '200px' }}>Time</th>
									<th style={{ width: '200px' }}>Weekday</th>

									<th>Price-Euros </th>
								</tr>
								{uniqueDepartures && uniqueDepartures.map((departure, index) => {
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
											{departure.availableTickets.sort((a, b) => a.price > b.price)[0].price < 70 ? "cheap " : ""}
											{departure.availableTickets.sort((a, b) => a.price > b.price)[0].price}

										</td>
									</tr>
								})}
							</tbody>
						</table>
					</section>
					<section>
						<h2>Try me!</h2>
						<form onSubmit={this.props.onSubmitForm}>
							<label htmlFor="username">
								Show Github repositories by
                <span className="at-prefix">@</span>
								<input
									id="username"
									type="text"
									placeholder="flexdinesh"
									value={this.props.username}
									onChange={this.props.onChangeUsername}
								/>
							</label>
						</form>
						<ReposList {...reposListProps} />
					</section>
				</div>
			</article>
		);
	}
}

HomePage.propTypes = {
	loading: PropTypes.bool,
	error: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.bool,
	]),
	repos: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.bool,
	]),
	onSubmitForm: PropTypes.func,
	username: PropTypes.string,
	onChangeUsername: PropTypes.func,
};
