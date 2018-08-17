import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './images/LOGO.jpg';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
	render() {
		return (
			<div className="header">
				<img src={Banner} alt="scandegrator  - Logo" />
				<div className="nav-bar">
					{/* <Link className="router-link" to="/">
						Home
					</Link>
					<Link className="router-link" to="/scandlines">
						Scandlines
					</Link> */}
				</div>
			</div>
		);
	}
}

export default Header;
