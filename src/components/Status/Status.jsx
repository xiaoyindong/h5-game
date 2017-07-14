import React from 'react';
require('./style');
class Status extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reflush: 1
		}
		this.systemInfo = [];
	}
	setMes(mes) {
		this.wrap.style.opacity = 1;
		this.systemInfo.push(mes);
		this.systemInfo.splice(0, this.systemInfo.length > 5 ? this.systemInfo.length - 5 : 0);
		this.setState({ reflush: Math.random() });
		setTimeout(() => {
			let opacity = 1;
			const opcityTime = setInterval(() => {
				this.wrap.style.opacity = opacity;
				opacity -= 0.1;
				if (opacity <= 0.1) {
					opacity = 0;
					this.wrap.style.opacity = opacity;
					clearInterval(opcityTime);
				}
			}, 150);
		}, 5000);
	}
	render() {
		const arr = [];
		this.systemInfo.forEach((mes, idx) => {
			arr.push(<div key={idx}>{mes}</div>);
		});
		return (
			<div className="status-wrap" ref={c => this.wrap = c} key={this.state.reflush}>
				{arr}
      </div>
		)
	}
}
export default Status;