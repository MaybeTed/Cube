import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Welcome from './Welcome';

class App extends React.Component {
	render() {
		return (
			<div>
				<Nav />
				<Switch>
					<Route path="/" render={() => (<Welcome />)} />
				</Switch>
			</div>
		)
	}
}

export default App;
