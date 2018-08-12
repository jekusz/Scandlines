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
import DeparturesTable from './Components/DeparturesTable'
import DeparturesRequestForm from 'containers/ScandlinesPage/Components/DeparturesRequestForm';

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
				<DeparturesRequestForm />
				<div className="home-page">
					<section className="centered">
						<h2>Start your next react project in seconds</h2>
						<p>A minimal <i>React-Redux</i> boilerplate with all the best practices</p>
					</section>
					<section>
						<button onClick={this.props.onLoadDepartures} className='router-link'> yalla </button>
						<DeparturesTable departures={departures} />
					</section>
				</div>
			</article>
		);
	}
}

