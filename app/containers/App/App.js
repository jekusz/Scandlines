import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './style.scss';
import ScandlinesPage from 'containers/ScandlinesPage/Loadable';
import ReactGA from 'react-ga';

export default class App extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			reactGaInitialised: false,
		};
	}
	componentWillMount = () => {
		if (!this.state.reactGaInitialised) {
			ReactGA.initialize('UA-126492236-1');
			// Send initial test view
			ReactGA.pageview('test-init-pageview');
			this.setState({ reactGaInitialised: true });
		}
	}

	render() {
		const { reactGaInitialised } = this.state;

		return (
			<div className="app-wrapper">
				<Helmet
					titleTemplate="%s - Scandegrator"
					defaultTitle="Scandegrator"
				>
					<meta name="Scandegrator" content="a scandilines ferry ticket aggregator" />
				</Helmet>
				<Header />
				<Switch>
					<Route path="/" component={ScandlinesPage} />
					<Route path="" component={NotFoundPage} />
				</Switch>
				<Footer />
			</div>
		);
	}
}