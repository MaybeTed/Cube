import React from 'react';
import Timer from './Timer';

class Game extends React.Component {
	constructor() {
		super();
		this.state = {
			gameStarted: false,
			win: false
		}
		this.clearGame = this.clearGame.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.win && this.state.gameStarted === true) {
			this.setState({ win: true });
		}
	}

	clearGame() {
		this.setState({ gameStarted: false, win: false })
	}

	handleClick() {
		this.props.shuffleColors();
		this.setState({ gameStarted: true });
	}

	render() {
		return (
			<div>
				{this.state.gameStarted ?
				<Timer win={this.state.win} clearGame={this.clearGame} />
				:
				<div className="start-game-button" onClick={this.handleClick}>Start Game</div>
				}
			</div>
		)
	}
}

export default Game;
