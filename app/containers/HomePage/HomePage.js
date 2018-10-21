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

export default class HomePage extends React.PureComponent { 
	/**
	 * when initial state username is not null, submit the form to load repos
	 */
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (this.props.username && this.props.username.trim().length > 0) {
			this.props.onSubmitForm();
		}
	}


	render() {
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
					<meta name="description" content="A React.js scandegrator application homepage" />
				</Helmet>
				<div className="home-page">
					<section className="centered">
						<h2>Start your next react project in seconds</h2>
						<p>A minimal <i>React-Redux</i> aggregator with all the best practices</p>
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
};
