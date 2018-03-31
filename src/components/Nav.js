import React from 'react';

class Nav extends React.Component {
	constructor() {
		super();
		this.state = {

		}
	}

	render() {
		return (
			<div className="nav">
				<h1>Title</h1>
				<ul className="nav-links">
					<li>About</li>
					<li>Register</li>
					<li>Login</li>
				</ul>
			</div>
		)
	}
}

export default Nav;
