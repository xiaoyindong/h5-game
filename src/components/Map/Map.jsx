import React from 'react';
import ReactDOM from 'react-dom';
import { getStyle, random } from '../Utils';
import Person from '../Person';
require('./style');
class Map extends React.Component {
	constructor(props) {
		super(props);
		this.left = -870;
		this.top = -530;
		this.timer = null;
		this.persons = [];
	}
	componentDidMount() {
		this.loadPerson();
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
			if (this.left <= -1600) {
				this.left = -1600;
			} else if (this.left >= 0) {
				this.left = 0;
			}
			if (this.top >= 0) {
				this.top = 0;
			} else if (this.top <= -800) {
				this.top = -800;
			}
			this.background.style.top = this.top + 'px';
			this.background.style.left = this.left + 'px ';
		}, 16)
		
	}
	dieEvent() {
		console.log('机器人死亡');
	}
	loadPerson() {
		for (let i = 0; i < 40; i++) {
			this.persons.push(<Person left={random(220, 2000)} top={random(280, 900)} preClass={'person-ai'} key={i} personInfo={{name: '张三2', level: 1}} AI={true} blood={0} dieEvent={this.dieEvent.bind(this)} />)
		}
	}
	render() {
		return (
			<div className="map-wrap" ref={c => this.background = c}>
					{
						this.persons
					}
			</div>
		)
	}
}

export default Map;