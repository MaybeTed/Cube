import React from 'react';
import axios from 'axios';
import Timer from './Timer';

class Game extends React.Component {
	constructor() {
		super();
		this.state = {
			gameStarted: false,
			win: false,
			winningTime: '',
			winningSeconds: 0
		}
		this.handleClick = this.handleClick.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.win && this.state.gameStarted === true) {
			console.log('YOU WIN')
			this.setState({ win: true });
		}
	}

	afterWinning(time, seconds) {
		this.setState({ winningTime: time, winningSeconds: seconds });
	}

	handleClick() {
		this.props.shuffleColors();
		this.setState({ gameStarted: !this.state.gameStarted });
	}

	sendWinnerToDatabase() {
		event.preventDefault();
		let name = document.getElementById('winnersName').value;
		document.getElementById('winnersName').value = '';
		if (name === null || name === '') {
			name = 'Anonymous';
		}
		axios.post('/api/new-winner', {
			name,
			time: this.state.winningTime,
			seconds: this.state.winningSeconds
		}).then((response) => {
			this.setState({ gameStarted: false, win: false, winningTime: '', winningSeconds: 0 });
		});
	}

	render() {
		return (
			<div>
				{this.state.gameStarted ?
				<Timer win={this.state.win} afterWinning={this.afterWinning} />
				:
				<div className="start-game-button" onClick={this.handleClick}>Start Game</div>
				}
				
				{this.state.winningSeconds > 0 ?
				<div>
					<p>Congratulations you won!</p>
					<form onSubmit={this.sendWinnerToDatabase}>
						<input placeholder="enter your name" id="winnersName" />
						<button type="submit">Submit</button>
					</form>
				</div>
				:
				null
				}
			</div>
		)
	}
}

export default Game;
