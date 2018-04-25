import React from 'react';

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
	}

	componentDidMount() {
		this.nv.addEventListener('keypress', this.handleKeyPress);
	}

	componentWillUnmount() {
		this.nv.removeEventListener('keypress', this.handleKeyPress);
	}

	handleKeyPress(event) {
		let x = this.state.xAngle;
		let y = this.state.yAngle;
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
		const cube = document.getElementById('cube');
		cube.style.webkitTransform = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
		this.setState({ xAngle: x, yAngle: y });
	}

	matrixRight(face) {
  		return [face[6], face[3], face[0], face[7], face[4], face[1], face[8], face[5], face[2]];
	}

	matrixLeft(face) {
  		return [face[2], face[5], face[8], face[1], face[4], face[7], face[0], face[3], face[6]];
	}

	move(row, column, direction) {
	  let { front, back, top, bottom, left, right } = this.state;

	  // if row isnt null shift a row left or right
	  if (row !== null) {
	    if (row === 1) {
	      var frontChunk = front.splice(0,3);
	      if (direction === 'left') {
	        front.unshift(...right.splice(0,3));
	        right.unshift(...back.splice(0,3));
	        back.unshift(...left.splice(0,3));
	        left.unshift(...frontChunk);
	        top = this.matrixRight(top);
	      } else {
	        front.unshift(...left.splice(0,3));
	        left.unshift(...back.splice(0,3));
	        back.unshift(...right.splice(0,3));
	        right.unshift(...frontChunk);
	        top = this.matrixLeft(top);
	      }
	    } else {
	      var frontChunk = front.splice(6, 9);
	      if (direction === 'left') {
	        front.push(...right.splice(6,9));
	        right.push(...back.splice(6,9));
	        back.push(...left.splice(6,9));
	        left.push(...frontChunk);
	        bottom = this.matrixRight(bottom);
	      } else {
	        front.push(...left.splice(6,9));
	        left.push(...back.splice(6,9));
	        back.push(...right.splice(6,9));
	        right.push(...frontChunk);
	        bottom = this.matrixLeft(bottom);
	      }
	    }
	  } else {
	    if (column === 1) {
	      var topChunk = front[0];
	      var middleChunk = front[3];
	      var bottomChunk = front[6];
	      if (direction === 'up') {
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
	      } else {
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
	      }
	    } else {
	      // if column = 3
	      var topChunk = front[2];
	      var middleChunk = front[5];
	      var bottomChunk = front[8];
	      if (direction === 'up') {
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
	        right = this.matrixRight(right)
	      } else {
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
	      }
	    }
	  }
	  this.setState({ front, back, top, bottom, left, right });
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
					<div className="move-button left1" onClick={() => this.move(1, null, 'left')}>&larr;</div>
					<div className="move-button right1" onClick={() => this.move(1, null, 'right')}>&rarr;</div>
					<div className="move-button up1" onClick={() => this.move(null, 1, 'up')}>&uarr;</div>
					<div className="move-button up3" onClick={() => this.move(null, 3, 'up')}>&uarr;</div>
					<div className="move-button left3" onClick={() => this.move(3, null, 'left')}>&larr;</div>
					<div className="move-button right3" onClick={() => this.move(3, null, 'right')}>&rarr;</div>
					<div className="move-button down1" onClick={() => this.move(null, 1, 'down')}>&darr;</div>
					<div className="move-button down3" onClick={() => this.move(null, 3, 'down')}>&darr;</div>
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
