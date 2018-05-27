import React from 'react';
import axios from 'axios';

class Leaderboard extends React.Component {
	constructor () {
		super();
		this.state = {
			winners: []
		}
	}

	componentDidMount() {
		axios.get('/api/winners')
			.then((response) => {
				this.setState({ winners: response.data.winners });
			})
	}

	render() {

		return (
			<div className="leaderboard">
			    <h3>Leaderboard</h3>
			    <table>
				  	<tbody>
					  	<tr>
					  		<th>Name</th>
					  		<th>Time</th>
					  	</tr>
					  {this.state.winners.map((winner, i) => {
						  return (
						  	<tr key={i}>
						  		<td>{winner.name}</td>
						  		<td>{winner.time}</td>
						  	</tr>
						  )
					  })
					  }
				  	</tbody>
			    </table>
			</div>
		)
	}
}

export default Leaderboard;
