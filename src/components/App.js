import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Welcome from './Welcome';
import About from './About';
import Register from './Register';
import Login from './Login';

class App extends React.Component {
	render() {
		return (
			<div>
				<Nav />
				<Switch>
					<Route exact path="/" render={() => (<Welcome />)} />
					<Route path="/about" render={() => (<About />)} />
					<Route path="/register" render={() => (<Register />)} />
					<Route path="/login" render={() => (<Login />)} />
				</Switch>
			</div>
		)
	}
}

export default App;
