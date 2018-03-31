import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App';

render(
	<BrowserRouter>
		<Switch>
			<Route path="/" component={App} />
		</Switch>
	</BrowserRouter>,
	document.getElementById('root')
);
