import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Cube from './Cube';
import Leaderboard from './Leaderboard';

class App extends React.Component {
	render() {
		return (
			<div>
				<Nav />
				<Switch>
					<Route exact path="/" render={() => (<Cube />)} />
					<Route path="/leaderboard" render={() => (<Leaderboard />)} />
				</Switch>
			</div>
		)
	}
}

export default App;
