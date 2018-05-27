import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
	constructor() {
		super();
		this.state = {
			winners: []
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps && nextProps.winners) {
			this.setState({ winners: nextProps.winners });
		}
	}

	render() {
		return (
			<div className="nav">
				<Link to="/"><h1>Cube</h1></Link>
				<ul className="nav-links">
					{this.state.winners.length ? 
					<Link to="/leaderboard" ><li>Winners</li></Link>
					:
					null
					}
				</ul>
			</div>
		)
	}
}

export default Nav;
