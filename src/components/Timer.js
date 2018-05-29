import React from 'react';
import axios from 'axios';

class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sTens: 0,
			sOnes: 0,
			mTens: 0,
			mOnes: 0,
			winningTime: '',
			winningSeconds: 0
		}
		this.sendWinnerToDatabase = this.sendWinnerToDatabase.bind(this);
	}

	componentDidMount() {
		this.timer = setInterval(this.increaseTime.bind(this), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.win && !this.state.stopProps) {
			clearInterval(this.timer);
			let { sTens, sOnes, mTens, mOnes } = this.state;
			let time = mTens + '' + mOnes + ':' + sTens + '' + sOnes;
			let seconds = +(mTens + '' + mOnes) * 60 + +(sTens + '' + sOnes);
			this.setState({ winningTime: time, winningSeconds: seconds });
		}
	}

	increaseTime() {
		let { sTens, sOnes, mTens, mOnes } = this.state;
		sOnes++;
		if (sOnes === 10) {
			sTens++;
			sOnes = 0;
			if (sTens === 6) {
				mOnes++;
				sTens = 0;
				if (mOnes === 10) {
					mTens++;
					mOnes = 0;
				}
			}
		}
		this.setState({ sTens, sOnes, mTens, mOnes });
	}

	sendWinnerToDatabase(event) {
		event.preventDefault();
		let name = document.getElementById('winnersName').value;
		document.getElementById('winnersName').value = '';
		if (name === null || name === '') {
			name = 'Anonymous';
		}
		let data = {
			name,
			time: this.state.winningTime,
			seconds: this.state.winningSeconds
		}
		axios.post('/api/new-winner', data).then(() => {
			this.setState({ winningTime: '', winningSeconds: 0 });
			this.props.clearGame();
		});
	}

	render() {
		return (
			<div>
				{this.props.win ? 
				<div className="winning-message">
					<p>Congratulations you won!</p>
					<form onSubmit={this.sendWinnerToDatabase}>
						<input placeholder="enter your name" id="winnersName" />
						<button type="submit">Submit</button>
					</form>
				</div>
				:
				null
				}
				<div className="timer-container">
					<div className="number-container m-tens">{this.state.mTens}</div>
					<div className="number-container m-ones">{this.state.mOnes}</div>
					:
					<div className="number-container s-tens">{this.state.sTens}</div>
					<div className="number-container s-ones">{this.state.sOnes}</div>
				</div>
			</div>
		)
	}
}

export default Timer;
