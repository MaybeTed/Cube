import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Nav extends React.Component {
	constructor() {
		super();
		this.state = {
			winners: [],
		}
	}

	componentDidMount() {
		axios.get('/api/winners')
			.then((response) => {
				if (response.data.success) {
					this.setState({
						winners: response.data.winners,
					});
				}
			})
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
