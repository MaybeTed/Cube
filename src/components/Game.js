import React from 'react';
import Timer from './Timer';

class Game extends React.Component {
	constructor() {
		super();
		this.state = {
			gameStarted: false
		}
		this.handleClick = this.handleClick.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.win && this.state.gameStarted === true) {
			console.log('YOU WIN')
		}
	}

	handleClick() {
		this.props.shuffleColors();
		this.setState({ gameStarted: !this.state.gameStarted });
	}

	render() {
		return (
			<div>
				{this.state.gameStarted ?
				<Timer />
				:
				<div className="start-game-button" onClick={this.handleClick}>Start Game</div>
				}
			</div>
		)
	}
}

export default Game;
