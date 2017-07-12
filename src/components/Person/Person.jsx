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
		this.AIAction = 'default-right'
	}
	componentDidMount() {
		const { action, AI, left, top } = this.props;
		this.person.style.cssText = 'background: url(../../images/' + (action || 'default-right') + '.gif?temp=' + Math.random() + '); background-repeat: no-repeat;background-size: cover; left:' + left + 'px; top: ' + top + 'px';
		if (AI) {
			let Item = Actions[random(0, Actions.length)];
			this.AIAction = Item.action;
			this.move(Item.action, Item.left, Item.top, Item.tmp);
			const timer = setInterval(() => {
				if (this.current <= 0) { // 没血的时候静止不动;
					clearInterval(timer);
				}
				if (this.times > Item.time) {
					this.times = 100;
					Item = Actions[random(0, Actions.length)];
					this.AIAction = Item.action;
					this.move(Item.action, Item.left, Item.top, Item.tmp);
				}
				this.times += 100;
			}, 100)
			return;
		}
	}
	move(action, left, top, random) {
		clearInterval(this.moveTime);
		this.moveTime = setInterval(() => {
			if (this.current <= 0) { // 没血的时候静止不动;
				clearInterval(this.moveTime);
				action = action.indexOf('right') !== -1 ? 'die-right' : 'die-left';
			}
			let disX = (getStyle(this.person, 'left') + left);
			let disY = (getStyle(this.person, 'top') + top);
			if (disX < 200 || disX > 2050) {
				if (action.indexOf('right') !== -1) {
					action = action.replace('right', 'left');
				} else {
					action = action.replace('left', 'right');
				}
				left = -left;
			}
			if (disY < 280 || disY > 900) {
				top = -top;
			}
			this.person.style.cssText = 'background: url(../../images/' + (action || 'default-right') + '.gif?temp=' + random + '); background-repeat: no-repeat;background-size: cover; left:' + disX + 'px; top: ' + disY + 'px';
		}, 14)
	}
	componentDidUpdate(prop) {
		if (!this.canOpera) {
			return;
		}
		const { AI, blood, attack } = this.props;
		if (blood < 0) { // 掉血 暂定为被攻击
			this.Beaten(blood);
		}
		if (blood < 0) { // 加血 暂定为吃了失误
			this.addBlood();
		}
		if (AI) {
			return;
		}
		if (attack > 0) {
			this.Attack(attack);
		}
		this.chuck();

	}
	chuck() {
		const { action, time, defaultActiom } = this.props;
		this.person.style.cssText = 'background: url(../../images/' + action + '.gif?temp=' + Math.random() + '); background-repeat: no-repeat;background-size: cover';
		if (time) { // 攻击之后还原;
			setTimeout(() => {
				if (!this.person) {
					return;
				}
				this.person.style.cssText = 'background: url(../../images/' + (defaultActiom || 'default-right') + '.gif?temp=' + Math.random() + '); background-repeat: no-repeat;background-size: cover';
			}, time);
		}
	}
	Attack(attack) {
		window.persons.forEach(function (item) {
			item.Beaten(-500);
		}, this);
	}
	Beaten(blood) {
		if (!this.person) {
			return;
		}
		let { action } = this.props;
		const { personInfo, dieEvent, AI } = this.props;
		this.current += (blood || 0);
		this.current = this.current < 0 ? 0 : this.current;
		const percent = this.current / this.blood * 100 + '%';
		this.bloodLine.style.width = percent;
		action = AI ? this.AIAction : action; // 机器人死亡和玩家死亡不一样
		if (this.current <= 0) {
			this.canOpera = false;
			dieEvent && dieEvent(this.props);
			let disX = getStyle(this.person, 'left');
			let disY = getStyle(this.person, 'top');
			
			this.person.style.cssText = 'background: url(../../images/' + (action.indexOf('right') !== -1 ? 'die-right' : 'die-left') + '.gif?temp=' + Math.random() + '); background-repeat: no-repeat;background-size: cover; left:' + disX + 'px; top: ' + disY + 'px';
			let timer = null;
			let opacity = 1;
			setTimeout(() => {
				timer = setInterval(() => {
					this.person.style.opacity = opacity;
					opacity -= 0.1;
					if (opacity <= 0) {
						clearInterval(timer);
						this.person.parentNode.removeChild(this.person) // 销毁节点
						this.person = null;
						// this.person.style.display = 'none'; 
					}
				}, 100)
			}, 1200);
		}
	}
	addBlood() {

	}
	render() {
		const { personInfo, preClass } = this.props;
		return (
			<div
				ref={c => this.person = c}
				className={`${preClass} person-warp`}
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