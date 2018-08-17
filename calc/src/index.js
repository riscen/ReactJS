import React from 'react';
import ReactDom from 'react-dom';
import './style.css';

function WorkArea(props) {
	return (
		<div>
			<h3 className="work-area">Operation:</h3>
			<input className="work-area" type="text" name="work-area" defaultValue="0" onKeyPress={ props.keyPress } />
			<h3 className="work-area">=</h3>
			<input className="work-area" type="text" value={ props.result } />
		</div>
		);
}

class Calc extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			result: 0,
			history: [],
		}
	}

	doOperation(event) {
		if(event.key === 'Enter') {
			const history = this.state.history;
			const operation = event.target.value;
			try {
				const result = eval(operation);
				this.setState({
					result: result,
					history: history.concat(new Array([operation, result])),
				});
			}
			catch (err) {
				alert(operation + ' is not a correct operation.');
			}
		}
	}

	createTable() {
		const history = this.state.history;
		const table = history.map((current, index, arr) => {
			return (
				<tr key={ index }>
					<td>{ arr[index][0] }</td>
					<td>{ arr[index][1] }</td>
				</tr>
				);
		});
		return table;
	}

	render() {
		return (
			<div class="center">
				<h1>Simple calculator</h1>
				<p>
					This is my first official ReactJS application
					<br/>
					Write an operation in the operation textfield. Once you finish, press Enter.
				</p>
				<div>
					<WorkArea keyPress={ e => this.doOperation(e) }
					result={ this.state.result } />
				</div>
				<div>
					<table>
						<thead>
							<tr>
								<th>Operation</th>
								<th>Result</th>
							</tr>
						</thead>
						<tbody>
							{ this.createTable() }
						</tbody>
					</table>
				</div>
			</div>
			);
	}
}

ReactDom.render(<Calc />, 
	document.getElementById('root'));