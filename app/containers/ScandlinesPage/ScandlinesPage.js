
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';
import moment from 'moment'
import DeparturesTable from './Components/DeparturesTable'
import DeparturesRequestForm from 'containers/ScandlinesPage/Components/DeparturesRequestForm';

export default class ScandlinesPage extends React.PureComponent {

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

		return (
			<article>
				<Helmet>
					<title>Scandegrator</title>
					<meta name="description" content="An aggregator of most affordable Scandlines ferry tickets" />
				</Helmet>
				<DeparturesRequestForm
					onLoadDepartures={this.props.onLoadDepartures}
				/>
				<div className="home-page">
					<section className="centered">
						<h2>Find your cheapest Scandlines tickets</h2>
						<p>A minimal <i>web-based</i> cheap ticket aggregegator</p>
					</section>
					<section>
						<DeparturesTable
							departures={departures}
							loadingDepartures={this.props.loadingDepartures}
						/>
					</section>
				</div>
			</article>
		);
	}
}

