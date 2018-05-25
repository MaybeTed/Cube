import React from 'react';
import Game from './Game';

class Welcome extends React.Component {
	constructor() {
		super();
		this.state = {
			xAngle: 0,
			yAngle: 0,
			front: ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
			back: ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
			top: ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red'],
			bottom: ['orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange'],
			left: ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'],
			right: ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green']
		}
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.print = this.print.bind(this);
		this.shuffleColors = this.shuffleColors.bind(this);
	}

	componentDidMount() {
		this.nv.addEventListener('keypress', this.handleKeyPress);
	}

	componentWillUnmount() {
		this.nv.removeEventListener('keypress', this.handleKeyPress);
	}

	determineColor(xAngle, yAngle) {
	  const x = xAngle % 360;
	  const y = yAngle % 360;
	  if (x === 0 && y === 0) {

	  	console.log('white');
	  } else if (Math.abs(x) === 180 && Math.abs(y) === 180) {
	    console.log('white');
	  } else if ((x === 0 && (y === 90 || y === -270)) || (Math.abs(x) === 180 && (y === -90 || y === 270))) {
	    console.log('blue');
	  } else if ((x === 0 && (y === -90 || y === 270)) || (Math.abs(x) === 180 && (y === 90 || y === -270))) {
	    console.log('green');
	  } else if (x === -90 || x === 270) {
	    console.log('red');
	  } else if (x === 90 || x === -270) {
	    console.log('orange');
	  } else {
	    console.log('yellow')
	  }
	}

	handleClick(button) {
		const x = this.state.xAngle % 360;
		const y = this.state.yAngle % 360;
		if (x === 0 && y === 0) {
			// do nothing
		} else if (Math.abs(x) === 180 && Math.abs(y) === 180) {
			switch(button) {
				case 1: button = 4; break;
				case 2: button = 3; break;
				case 3: button = 2; break;
				case 4: button = 1; break;
				case 5: button = 8; break;
				case 6: button = 7; break;
				case 7: button = 6; break;
				case 8: button = 5; break;
			}
		}

		if (button === 1) {
			this.spinTopLayerLeft();
		} else if (button === 2) {
			this.spinTopLayerRight();
		} else if (button === 3) {
			this.spinBottomLayerLeft();
		} else if (button === 4) {
			this.spinBottomLayerRight();
		} else if (button === 5) {
			this.spinLeftLayerUp();
		} else if (button === 6) {
			this.spinLeftLayerDown();
		} else if (button === 7) {
			this.spinRightLayerUp();
		} else if (button === 8) {
			this.spinRightLayerDown();
		} else if (button === 9) {
			this.rotateFrontCounterClockwise();
		} else if (button === 10) {
			this.rotateFrontClockwise();
		} else if (button === 11) {
			this.rotateBackClockwise();
		} else if (button === 12) {
			this.rotateBackCounterClockwise();
		} 
	}

	handleKeyPress(event) {
		let x = this.state.xAngle;
		let y = this.state.yAngle;
		var faces;
		switch(event.keyCode) {
			case 37: // left
			  y -= 90;
			  break;
			case 38: // up
			  x += 90;
			  break;
			case 39: // right
			  y += 90;
			  break;
			case 40: // down
			  x -= 90;
			  break;
		};
		console.log('x: ', x);
		console.log('y: ', y);
		this.determineColor(x, y);
		const cube = document.getElementById('cube');
		cube.style.webkitTransform = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
		this.setState({
			xAngle: x,
			yAngle: y
		});
	}

	matrixRight(face) {
  		return [face[6], face[3], face[0], face[7], face[4], face[1], face[8], face[5], face[2]];
	}

	matrixLeft(face) {
  		return [face[2], face[5], face[8], face[1], face[4], face[7], face[0], face[3], face[6]];
	}

	rotateBackCounterClockwise() {
		console.log('rotateBackCounterClockwise')
		let { back, top, bottom, left, right } = this.state;
		let topChunk = top.slice(0, 3);
		top[0] = right[2];
		top[1] = right[5];
		top[2] = right[8];
		right[2] = bottom[8];
		right[5] = bottom[7];
		right[8] = bottom[6];
		bottom[6] = left[0];
		bottom[7] = left[3];
		bottom[8] = left[6];
		left[0] = topChunk[2];
		left[3] = topChunk[1];
		left[6] = topChunk[0];
		back = this.matrixRight(back);
		this.setState({ back, top, bottom, left, right });
	}

	rotateBackClockwise() {
		console.log('rotateBackClockwise')
		let { back, top, bottom, left, right } = this.state;
		let topChunk = top.slice(0, 3);
		top[0] = left[6];
		top[1] = left[3];
		top[2] = left[0];
		left[0] = bottom[6];
		left[3] = bottom[7];
		left[6] = bottom[8];
		bottom[6] = right[8];
		bottom[7] = right[5];
		bottom[8] = right[2];
		right[2] = topChunk[0];
		right[5] = topChunk[1];
		right[8] = topChunk[2];
		back = this.matrixLeft(back);
		this.setState({ back, top, bottom, left, right });
	}

	rotateFrontClockwise() {
		console.log('rotateFrontClockwise')
		let { front, top, bottom, left, right } = this.state;
		let topChunk = top.splice(6, 9);
		top[6] = left[8];
		top[7] = left[5];
		top[8] = left[2];
		left[2] = bottom[0];
		left[5] = bottom[1];
		left[8] = bottom[2];
		bottom[0] = right[6];
		bottom[1] = right[3];
		bottom[2] = right[0];
		right[0] = topChunk[0];
		right[3] = topChunk[1];
		right[6] = topChunk[2];
		front = this.matrixRight(front);
		this.setState({ front, top, bottom, left, right });
	}

	rotateFrontCounterClockwise() {
		console.log('rotateFrontCounterClockwise')
		let { front, top, bottom, left, right } = this.state;
		let topChunk = top.splice(6, 9);
		top[6] = right[0];
		top[7] = right[3];
		top[8] = right[6];
		right[0] = bottom[2];
		right[3] = bottom[1];
		right[6] = bottom[0];
		bottom[0] = left[2];
		bottom[1] = left[5];
		bottom[2] = left[8];
		left[2] = topChunk[2];
		left[5] = topChunk[1];
		left[8] = topChunk[0];
		front = this.matrixLeft(front);
		this.setState({ front, top, bottom, left, right });	
	}

	spinTopLayerLeft(direction) {
		let { front, left, right, back, top } = this.state;
		var frontChunk = front.splice(0,3);
		front.unshift(...right.splice(0,3));
	    right.unshift(...back.splice(0,3));
	    back.unshift(...left.splice(0,3));
	    left.unshift(...frontChunk);
	    top = this.matrixRight(top);
	    this.setState({ front, top, left, right, back });
	}

	spinTopLayerRight() {
		let { front, left, right, back, top } = this.state;
		var frontChunk = front.splice(0,3);
		front.unshift(...left.splice(0,3));
	    left.unshift(...back.splice(0,3));
	    back.unshift(...right.splice(0,3));
	    right.unshift(...frontChunk);
	    top = this.matrixLeft(top);
	    this.setState({ front, left, right, back, top });
	}

	spinBottomLayerLeft() {
		let { front, left, right, back, bottom } = this.state;
		var frontChunk = front.splice(6, 9);
		front.push(...right.splice(6,9));
	    right.push(...back.splice(6,9));
	    back.push(...left.splice(6,9));
	    left.push(...frontChunk);
	    bottom = this.matrixLeft(bottom);
	    this.setState({ front, left, right, back, bottom });
	}

	spinBottomLayerRight() {
		let { front, left, right, back, bottom } = this.state;
		var frontChunk = front.splice(6, 9);
		front.push(...left.splice(6,9));
	    left.push(...back.splice(6,9));
	    back.push(...right.splice(6,9));
	    right.push(...frontChunk);
	    bottom = this.matrixRight(bottom);
	    this.setState({ front, left, right, back, bottom });
	}

	spinLeftLayerUp() {
		let { front, top, back, bottom, left } = this.state;
		var topChunk = front[0];
	    var middleChunk = front[3];
	    var bottomChunk = front[6];
        front[0] = bottom[0];
        front[3] = bottom[3];
        front[6] = bottom[6];
        bottom[0] = back[8];
        bottom[3] = back[5];
        bottom[6] = back[2];     
        back[2] = top[6];
        back[5] = top[3];
        back[8] = top[0];
        top[0] = topChunk;
        top[3] = middleChunk;
        top[6] = bottomChunk;
        left = this.matrixLeft(left);
        this.setState({ front, top, back, bottom, left });
	}

	spinLeftLayerDown() {
		let { front, top, back, bottom, left } = this.state;
		var topChunk = front[0];
	    var middleChunk = front[3];
	    var bottomChunk = front[6];
        front[0] = top[0];
        front[3] = top[3];
        front[6] = top[6];
        top[0] = back[8];
        top[3] = back[5];
        top[6] = back[2];     
        back[2] = bottom[6];
        back[5] = bottom[3];
        back[8] = bottom[0];
        bottom[0] = topChunk;
        bottom[3] = middleChunk;
        bottom[6] = bottomChunk;
        left = this.matrixRight(left);
        this.setState({ front, top, back, bottom, left });
	}

	spinRightLayerUp() {
		let { front, top, back, bottom, right } = this.state;
		var topChunk = front[2];
	    var middleChunk = front[5];
	    var bottomChunk = front[8];
        front[2] = bottom[2];
        front[5] = bottom[5];
        front[8] = bottom[8];
        bottom[2] = back[6];
        bottom[5] = back[3];
        bottom[8] = back[0];
        back[0] = top[8];
        back[3] = top[5];
        back[6] = top[2];
        top[2] = topChunk;
        top[5] = middleChunk;
        top[8] = bottomChunk;
        right = this.matrixRight(right);
        this.setState({ front, top, back, bottom, right });
	}

	spinRightLayerDown() {
		let { front, top, back, bottom, right } = this.state;
		var topChunk = front[2];
	    var middleChunk = front[5];
	    var bottomChunk = front[8];
	    front[2] =top[2];
        front[5] =top[5];
        front[8] =top[8];
        top[2] = back[6];
        top[5] = back[3];
        top[8] = back[0];
        back[0] = bottom[8];
        back[3] = bottom[5];
        back[6] = bottom[2];
        bottom[2] = topChunk;
        bottom[5] = middleChunk;
        bottom[8] = bottomChunk;
        right = this.matrixLeft(right);
        this.setState({ front, top, back, bottom, right });
	}

	shuffleColors() {
		let front = ['green', 'white', 'yellow', 'orange', 'white', 'red', 'red', 'blue', 'green'];
		let top = ['red', 'green', 'white', 'white', 'red', 'orange', 'white', 'green', 'red'];
		let bottom = ['white', 'yellow', 'red', 'yellow', 'orange', 'yellow', 'yellow', 'orange', 'green'];
		let left = ['yellow', 'blue', 'orange', 'blue', 'blue', 'green', 'orange', 'orange', 'blue'];
		let right = ['blue', 'white', 'blue', 'white', 'green', 'red', 'white', 'green', 'yellow'];
		let back = ['orange', 'red', 'green', 'yellow', 'yellow', 'red', 'orange', 'blue', 'blue'];
		this.setState({ front, top, bottom, left, right, back });
	}

	print(face) {
		return this.state[face].map((color, i) => {
			return <div key={i} style={{'background': color}} />
		})
	}

	render() {
		return (
			<div className="welcome" ref={elem => this.nv = elem} onKeyDown={this.handleKeyPress} tabIndex="0">
				<div className="buttons-container">
					<Game shuffleColors={this.shuffleColors} />
					<div className="move-button left1" ref="1" onClick={() => this.handleClick(1)}>&larr;</div>
					<div className="move-button right1" onClick={() => this.handleClick(2)}>&rarr;</div>
					<div className="move-button up1" onClick={() => this.handleClick(5)}>&uarr;</div>
					<div className="move-button up3" onClick={() => this.handleClick(7)}>&uarr;</div>
					<div className="move-button left3" onClick={() => this.handleClick(3)}>&larr;</div>
					<div className="move-button right3" onClick={() => this.handleClick(4)}>&rarr;</div>
					<div className="move-button down1" onClick={() => this.handleClick(6)}>&darr;</div>
					<div className="move-button down3" onClick={() => this.handleClick(8)}>&darr;</div>
					<div className="move-button counter-clockwise" onClick={() => this.handleClick(9)}>&larr;</div>
					<div className="move-button clockwise" onClick={() => this.handleClick(10)}>&rarr;</div>
					<div className="move-button back-left" onClick={() => this.handleClick(11)}>&larr;</div>
					<div className="move-button back-right" onClick={() => this.handleClick(12)}>&rarr;</div>
					<p className="button-text counter-clockwise-text">Front</p>
					<p className="button-text clockwise-text">Front</p>
					<p className="button-text back-left-text">Back</p>
					<p className="button-text back-right-text">Back</p>
					<section className="cube-container" >
						<div id="cube">
							<figure className="front">
								{this.print('front')}
							</figure>
							<figure className="back">
								{this.print('back')}
							</figure>
							<figure className="right">
								{this.print('right')}
							</figure>
							<figure className="left">
								{this.print('left')}
							</figure>
							<figure className="top">
								{this.print('top')}
							</figure>
							<figure className="bottom">
								{this.print('bottom')}
							</figure>
						</div>
					</section>
				</div>
			</div>
		)
	}
}

export default Welcome;
