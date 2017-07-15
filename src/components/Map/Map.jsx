import React from 'react';
import ReactDOM from 'react-dom';
import { getStyle, random, getPerson } from '../Utils';
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
		setTimeout(() => {
			this.loadPerson();
		})
	}

	componentDidUpdate(props) {
	}

	MapMove(left, top) {
		clearInterval(this.timer);
		if (!left && !top) {
			return;
		}
		this.timer = setInterval(() => {
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
			this.position.style.top = this.top + 'px';
			this.position.style.left = this.left + 'px ';
		}, 16)
	}
	dieEvent(info, killUser, me) {
		const { id, personInfo } = info;
		const { name } = killUser;
		const message = '惊！！' + personInfo.name + '被' + name + '杀死了';
		window.MessageSystem.addMessage(message, 'system', 'system', 'all');
		window.AIPersonSystem.forEach((item, idx) => {
			if (item.props.id === id) {
				item.setDestory();
				window.AIPersonSystem.splice(idx, 1);
				return;
			}
		});
		me.KILLPERSON(personInfo); // 调用方法，增加经验;
	}
	loadPerson() {
		for (let i = 0; i < 1; i++) {
			this.persons.push(<Person
				ref={c => window.AIPersonSystem.push(c)}
				getExperience={this.props.getExperience}
				id={i + 100001}
				left={random(220, 1800)} // 出生位置
				top={random(280, 900)} // 出生位置
				preClass={'person-ai'}
				key={i} personInfo={getPerson()}
				AI={true} blood={0}
				dieEvent={this.dieEvent.bind(this)} />)
		}
		this.setState({ refresh: Math.random()});
	}
	getPosition() {
		return {
			left: getStyle(this.position, 'left'),
			top: getStyle(this.position, 'top')
		}
	}
	render() {
		return (
			<div className="map-wrap" ref={c => this.position = c}>
				{
					this.persons
				}
			</div>
		)
	}
}

export default Map;