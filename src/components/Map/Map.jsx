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
			this.position.style.top = this.top + 'px';
			this.position.style.left = this.left + 'px ';
		}, 16)
	}
	dieEvent(info, killUser) {
		const { id, personInfo } = info;
		const { name } = killUser;
		const message= '惊！！' + personInfo.name + '被' + name + '杀死了';
		window.MessageSystem.addMessage(message, 'system', 'system', 'all');
		window.AIPersonSystem.forEach((item, idx) => {
			window.AIPersonSystem.splice(idx, (item.props.id === id ? 1 : 0));
		})
	}
	loadPerson() {
		for (let i = 0; i < 5; i++) {
			this.persons.push(<Person ref={c => window.AIPersonSystem.push(c)} id={i + 100001} left={random(220, 1800)} top={random(280, 900)} preClass={'person-ai'} key={i} personInfo={getPerson()} AI={true} blood={0} dieEvent={this.dieEvent.bind(this)} />)
		}
		// this.setState({ refresh: Math.random()});
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