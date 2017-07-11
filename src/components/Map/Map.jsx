import React from 'react';
import ReactDOM from 'react-dom';
import { getStyle } from '../Utils';
import Person from '../Person';
require('./style');
class Map extends React.Component {
	constructor(props) {
		super(props);
		this.left = -600;
		this.top = -380;
		this.timer = null;
	}
	componentDidMount() {

	}
	componentDidUpdate(props) {
		const {left, top} = this.props;
		clearInterval(this.timer);
		if (!left && !top) {
			return;
		}
		this.timer = setInterval(()=>{
			this.left -= left;
			this.top -= top;
			if (this.left <= -1120) {
				this.left = -1120;
			} else if (this.left >= 0) {
				this.left = 0;
			}
			if (this.top >= 0) {
				this.top = 0;
			} else if (this.top <= -940) {
				this.top = -940;
			}
			this.background.style.backgroundPosition = this.left + 'px ' + this.top + 'px';
		}, 16)
		
	}
	dieEvent() {
		console.log('机器人死亡');
	}
	render() {
		const arr = [];
		for (let i = 0; i < 30; i++) {
			arr.push(<Person key={i} personInfo={{name: '张三2', level: 1}} AI={true} blood={0} dieEvent={this.dieEvent.bind(this)} />)
		}
		return (
			<div className="map-wrap" ref={c => this.background = c}>
				{arr}
			</div>
		)
	}
}

export default Map;