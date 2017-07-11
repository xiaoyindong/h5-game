import React from 'react';
import ReactDOM from 'react-dom';
import Opera from '../../components/Opera';
import Map from '../../components/Map';
import Person from '../../components/Person';

require('./style');

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			left: 0,
			top: 0,
			action: 'default-right',
		}
		this.Opera = true;
		this.code = [];
		this.action = 'default-right';
	}
	componentDidMount() {
		document.addEventListener('keydown', this.KeyDown.bind(this));
		document.addEventListener('keyup', this.keyUp.bind(this));
	}

	KeyDown(e) {
		if (!this.Opera) {
			return;
		}
		const code = e.keyCode;
		let off = true;
		this.code.forEach((key) => {
			if (key === code) {
				off = false;
			}
		})
		if (!off) {
			return;
		}
		this.code.push(code);
		let left = 0;
		let top = 0;
		let action = '';
		this.time = 0;
		this.code.forEach((code) => {
			switch (code) {
				case 68: left = 4; action = 'run-right2'; this.action = 'default-right'; break;
				case 65: left = -4; action = 'run-left2'; this.action = 'default-left'; break;
				case 87: top = -4; action = 'run-right2'; this.action = 'default-right'; break;
				case 83: top = 4; action = 'run-left2'; this.action = 'default-left'; break;
				case 74: action = this.action === 'default-right' ? 'fowradL-right' : 'fowradL-left'; this.time = 900; break;
				case 75: action = this.action === 'default-right' ? 'qianci-right' : 'qianci-left'; this.time = 900; break;
				case 76: action = this.action === 'default-right' ? 'lianzhao-right' : 'lianzhao-left'; this.time = 2600; break;
			}

		});
		this.code.forEach((code) => {
			if (code === 68) {
				action = 'run-right2';
			} else if (code === 65) {
				action = 'run-left2';
			}
		})
		this.setState({ left, top, action });
	}
	keyUp(e) {
		const code = e.keyCode;
		this.code.forEach((key, idx) => {
			if (key === code) {
				this.code.splice(idx, 1)
			}
		});
		if (code === 68 || code === 65 || code === 83 || code === 87) {
			let left = 0;
			let top = 0;
			let action = this.action;
			this.code.forEach((code) => {
				switch (code) {
					case 68: left = 4; action = 'run-right2'; break;
					case 65: left = -4; action = 'run-left2'; break;
					case 87: top = -4; action = 'run-right2'; break;
					case 83: top = 4; action = 'run-left2'; break;
				}
			})
			this.setState({ left, top, action, blood: -5 });
		}
	}
	dieEvent() {
		this.Opera = false;
		console.log('死亡')
	}
	render() {
		return (
			<div id="wrap" onKeyDown={this.KeyDown.bind(this)}>
				<Map left={this.state.left} top={this.state.top} />
				<Person action={this.state.action} time={this.time} defaultActiom={this.action} personInfo={{name: '张三', level: 1}} AI={false} blood={this.state.blood} dieEvent={this.dieEvent.bind(this)} />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('App'));