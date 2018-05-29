import React from 'react';

class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sTens: 0,
			sOnes: 0,
			mTens: 0,
			mOnes: 0
		}
	}

	componentDidMount() {
		this.timer = setInterval(this.increaseTime.bind(this), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.win) {
			clearInterval(this.timer);
			let { sTens, sOnes, mTens, mOnes } = this.state;
			let time = mTens + '' + mOnes + ':' + sTens + '' + sOnes;
			let seconds = +(mTens + '' + mOnes) * 60 + +(sTens + '' + sOnes);
			nextProps.afterWinning(time, seconds);
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

	render() {
		return (
			<div className="timer-container">
				<div className="number-container m-tens">{this.state.mTens}</div>
				<div className="number-container m-ones">{this.state.mOnes}</div>
				:
				<div className="number-container s-tens">{this.state.sTens}</div>
				<div className="number-container s-ones">{this.state.sOnes}</div>
			</div>
		)
	}
}

export default Timer;
