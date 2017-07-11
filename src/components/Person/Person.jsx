import React from 'react';
import ReactDOM from 'react-dom';
import { getStyle, random } from '../Utils';
import Actions from './Actions';
require('./style');
class Person extends React.Component {
	constructor(props) {
		super(props);

		this.blood = props.personInfo.level * 50;
		this.current = this.blood
		this.canOpera = true;
		this.times = 0;
	}
	componentDidMount() {
		const { action, AI } = this.props;
		this.person.style.cssText = 'background: url(../../images/' + (action || 'default-right') + '.gif?temp=' + Math.random() + '); background-repeat: no-repeat;background-size: cover';
		if (AI) {
			let Item = Actions[random(0, Actions.length)];
			this.move(Item.action, Item.left, Item.top, Item.tmp);
			setInterval(() => {
				if (this.times > Item.time) {
					this.times = 100;
					Item = Actions[random(0, Actions.length)];
					this.move(Item.action, Item.left, Item.top, Item.tmp);
				}
				this.times += 100;
			},100)
			return;
		}
	}
	move(action, left, top, random) {
		clearInterval(this.moveTime);
		this.moveTime = setInterval(() => {
			this.person.style.cssText = 'background: url(../../images/' + (action || 'default-right') + '.gif?temp=' + random + '); background-repeat: no-repeat;background-size: cover; left:' + (getStyle(this.person, 'left') + left) + 'px; top: ' + (getStyle(this.person, 'top') + top) + 'px';
		}, 14)
	}
	componentDidUpdate(prop) {
		if (!this.canOpera) {
			return;
		}
		const { action, time, defaultActiom, AI, blood, id, dieEvent, personInfo } = this.props;
		this.current += (blood || 0);
		const percent = this.current / this.blood * 100 + '%';
		this.bloodLine.style.width = percent;
		if (this.current <= 0) {
			this.canOpera = false;
			dieEvent && dieEvent(personInfo.id);
			this.person.style.cssText = 'background: url(../../images/' + (action.indexOf('right') !== -1 ? 'die-right' : 'die-left') + '.gif??temp=' + Math.random() + '); background-repeat: no-repeat;background-size: cover';
			let timer = null;
			let opacity = 1;
			setTimeout(() => {
				timer = setInterval(() => {
					this.person.style.opacity = opacity;
					opacity -= 0.1;
					if (opacity <= 0) {
						clearInterval(timer);
						this.person.style.display = 'none';
					}
				}, 100)
			}, 1200);
			return;
		}
		if (AI) {
			return;
		}
		this.chuck(action, time, defaultActiom);

	}
	chuck(action, time, defaultActiom) {
		this.person.style.cssText = 'background: url(../../images/' + action + '.gif??temp=' + Math.random() + '); background-repeat: no-repeat;background-size: cover';
		if (time) {
			setTimeout(() => {
				if (!this.person) {
					return;
				}
				this.person.style.cssText = 'background: url(../../images/' + (defaultActiom || 'default-right') + '.gif?temp=' + Math.random() + '); background-repeat: no-repeat;background-size: cover';
			}, time);
		}
	}
	render() {
		const { personInfo } = this.props;
		return (
			<div
				ref={c => this.person = c}
				className="person-warp"
			>
				<div className="person-info">
					<div className="person-name">{personInfo.name}</div>
					<div className="blood">
						<div className="wrap">
							<div ref={c => this.bloodLine = c} />
						</div>
					</div>
					<div className="person-level">Lv: <span>{personInfo.level}</span></div>
				</div>
			</div>
		);
	}
}

export default Person;