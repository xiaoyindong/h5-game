import React from 'react';
import ReactDOM from 'react-dom';
import { getStyle, random, getPerson } from '../Utils';
import Person from '../Person';
require('./style');
class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 10000
		}
		this.left = -870;
		this.top = -530;
		this.timer = null;
		this.persons = [];
		this.personNum = 16;
		this.dieList = [];
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
	dieEvent(info, killUser, me, bool) {
		if (!bool) {
			const { id, personInfo } = info;
			const { name } = killUser;
			const message = '惊！！' + personInfo.name + '被' + name + '杀死了';
			window.MessageSystem.addMessage(message, 'system', 'system', 'all');
			window.AIPersonSystem.forEach((item, idx) => {
				if (!item) {
					return;
				}
				if (item.props.id === id) {
					this.dieList.push(item);
					return;
				}
			});
			me.KILLPERSON(personInfo, id); // 调用方法，增加经验;
		}
		if (bool) {
			this.addPerson();
		}

	}
	loadPerson() {
		for (let i = 0; i < this.personNum; i++) {
			this.persons.push(<Person
				ref={c => window.AIPersonSystem.push(c)}
				getExperience={this.props.getExperience}
				id={i + 100001}
				left={random(220, 1800)} // 出生位置
				top={random(280, 900)} // 出生位置
				preClass={'person-ai'}
				key={i}
				personInfo={getPerson()}
				AI={true}
				dieEvent={this.dieEvent.bind(this)} />)
		}
		return this.persons;
	}
	addPerson() {
		if (Math.round(this.persons.length/2) > this.dieList.length) {
			return;
		}
		setTimeout(() => {
			this.dieList.forEach((person, idx) => {
				person.person.style.opacity = 1;
				person.props.personInfo = getPerson();
				person.props.left = random(220, 1800);
				person.props.top = random(280, 900);
				person.Resurrection();
			})
		}, 2000)
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
					this.loadPerson()
				}
			</div>
		)
	}
}

export default Map;