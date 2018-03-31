import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
	constructor() {
		super();
		this.state = {

		}
	}

	render() {
		return (
			<div className="nav">
				<Link to="/"><h1>Title</h1></Link>
				<ul className="nav-links">
					<Link to="/about" ><li>About</li></Link>
					<Link to="/register" ><li>Register</li></Link>
					<Link to="/login" ><li>Login</li></Link>
				</ul>
			</div>
		)
	}
}

export default Nav;
