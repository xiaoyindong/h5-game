import React from 'react';
import ReactDOM from 'react-dom';
import { getStyle, random } from '../Utils';
import { NoHarm, SingleAttack, GroupAttack } from './AIActionList';
require('./style');
class Person extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reflush: 1
		}
		this.level = props.personInfo.level;
		this.blood = 5 + (props.personInfo.level * 5) + (props.personInfo.level - 0);
		this.magic = 3 + (props.personInfo.level * 3) + (props.personInfo.level - 0);
		this.currentB = this.blood
		this.currentM = this.magic
		this.canOpera = true;
		this.times = 0;
		this.defaultAction = 'default-right'
		this.timeInter = [];
		this.timeTimeout = []
	}
	componentDidMount() {
		const { action, AI, left, top } = this.props;
		if (!this.person) {
			return;
		}
		this.person.style.cssText = 'background: url(../../images/' + (action || 'default-right') + '.gif?temp=' + Math.random() + '); background-repeat: no-repeat;background-size: cover; left:' + left + 'px; top: ' + top + 'px';
		if (AI) {
			let Item = SingleAttack[random(0, SingleAttack.length)];
			this.defaultAction = Item.action;
			this.RobatAction(Item.action, Item.left, Item.top, Math.random());
			const timer = setInterval(() => {
				if (this.currentB <= 0) { // 没血的时候静止不动;
					clearInterval(timer);
				}
				if (!this.person) {
					clearInterval(timer);
					clearInterval(this.moveTime);
					return;
				}
				if (this.times > Item.time) {
					this.times = 100;
					Item = SingleAttack[random(0, SingleAttack.length)];
					this.defaultAction = Item.action;
					this.RobatAttack(3, Item.time);
					this.RobatAction(Item.action, Item.left, Item.top, Math.random());
				}
				this.times += 100;
			}, 100)
			this.timeInter.push(timer);
			return;
		} else {
			window.USER.setPlay({ // 挨打的时候
				name: this.props.personInfo.name,
				level: this.props.personInfo.level,
				blood: this.blood,
				currentB: this.currentB,
				magic: this.magic,
				currentM: this.currentM
			})
		}
	}

	RobatAction(action, left, top, random) {
		clearInterval(this.moveTime);
		this.timeInter.push(this.moveTime);
		this.moveTime = setInterval(() => {
			if (this.currentB <= 0) { // 没血的时候静止不动;
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
			if (!this.person) {
				return;
			}
			this.person.style.cssText = 'background: url(../../images/' + (action || 'default-right') + '.gif?temp=' + random + '); background-repeat: no-repeat;background-size: cover; left:' + disX + 'px; top: ' + disY + 'px';
		}, 14)
	}

	componentDidUpdate(prop) {
	}

	KILLPERSON(person) {
		const { personInfo, AI } = this.props;
		personInfo.experience += Math.round((person.level / personInfo.level) * 50 + 160 * (5 / personInfo.level)); // 经验
		personInfo.level = parseInt(personInfo.experience / 1500) + 1; // 等级
		// 资历值
		if (person.seniority < 0) {
			if (!AI) {
				window.StatusPerson.setMes('你杀了恶徒,资历值提升');
			}
			personInfo.seniority += Math.round(Math.abs(person.seniority) / 300);
		} else {
			if (!AI) {
				window.StatusPerson.setMes('你杀人了,资历值降低');
			}
			personInfo.seniority -= Math.round(Math.abs(person.seniority) / 50);
		}
		if (personInfo.level > this.level) {
			this.blood = 5 + (personInfo.level * 5) + (personInfo.level - 0);
			this.magic = 3 + (personInfo.level * 3) + (personInfo.level - 0);
			this.currentB = this.blood
			this.currentM = this.magic
			this.bloodLine.style.width = '100%';
			this.magicLine.style.width = '100%';
			personInfo.experience = Math.round((personInfo.experience - (personInfo.level - 1) * 1500) * 0.55 + (personInfo.level - 1) * 1500);
			this.level = personInfo.level;
			// 升级了。系统公告   震铄古今   人神共愤 群起而诛之
			if (!AI) {
				window.StatusPerson.setMes('恭喜你升到了' + this.level + '级！');
			}
		}
		let mes = '';
		if (person.seniority >= 6000) {
			mes = '注意！玩家【' + personInfo.name + '】杀害了[十世好人]【' + person.name + '】，此人极度危险!!!请注意躲避!!!';
		}
		if (person.seniority <= -6000) {
			mes = '注意！玩家【' + personInfo.name + '】经过不写努力,终于将[暴徒]' + person.name + '，斩于马下，从此震铄古今，威名远播!!!';
		}
		if (personInfo.seniority <= -6000) {
			const PX = getStyle(this.person, 'left');
			const PY = getStyle(this.person, 'top');
			const MX = window.MapSystem.getPosition().left;
			const MY = window.MapSystem.getPosition().top;
			const X = PX - MX;
			const Y = PY - MY;
			mes = '注意！玩家【' + personInfo.name + '】罪大恶极,臭名远扬，全区通缉!!!，当前坐标 (' + X + ' ,  ' + Y + ' )';
		}
		if (personInfo.seniority >= 6000) {
			mes = '玩家【' + personInfo.name + '】行侠仗义，除暴安民，威名远扬，万民敬仰';
		}
		this.props.getExperience && this.props.getExperience(mes);
		this.setState({ reflush: Math.random() });
	}

	PlayAction(action, time, defaultActiom) { // 人物动作；
		this.defaultAction = action;
		clearTimeout(this.beforeAction);
		if (!this.person) {
			return;
		}
		this.person.style.cssText = 'background: url(../../images/' + action + '.gif?temp=' + Math.random() + '); background-repeat: no-repeat;background-size: cover';
		if (time) { // 攻击之后还原;
			this.timeTimeout.push(this.beforeAction);
			this.beforeAction = setTimeout(() => { // 
				if (!this.person) {
					return;
				}
				this.person.style.cssText = 'background: url(../../images/' + (defaultActiom || 'default-right') + '.gif?temp=' + Math.random() + '); background-repeat: no-repeat;background-size: cover';
			}, time);
		}
	}
	PlayAttack(hurt, s) { // attack 为伤害值;  玩家
		const position = this.getPlayPosition();
		if (!position) {
			return;
		}
		const left = position.left;
		const top = position.top;
		this.radar(left, top, hurt);
	}

	radar(left, top, hurt) { // 雷达;
		window.AIPersonSystem.forEach((person, idx) => {
			const position = person.getPosition();
			if (!position) {
				return;
			}
			const Pleft = position.left;
			const Ptop = position.top;
			if (Pleft >= left - 65 && Pleft <= left + 65 && Ptop >= top - 35 && Ptop <= top + 35 && person.props.id !== this.props.id) {
				if (!person.focus) {
					person.focus = true;
					person.Beaten(hurt, this.props.personInfo, this);
					setTimeout(() => {
						person.focus = false;;
					}, 600);
				}
			}
		});
		{ // 打击用户
			const position = window.PLAYER.getPlayPosition();
			if (!position) {
				return;
			}
			const Pleft = position.left;
			const Ptop = position.top;
			if (Pleft >= left - 65 && Pleft <= left + 65 && Ptop >= top - 35 && Ptop <= top + 35 && window.PLAYER.props.id !== this.props.id) {
				if (!window.PLAYER.focus) {
					window.PLAYER.focus = true;
					window.PLAYER.Beaten(hurt, this.props.personInfo, this);
					setTimeout(() => {
						window.PLAYER.focus = false;;
					}, 600);
				}
				
			}
		}
	}
	RobatAttack(hurt, s) { // attack 为伤害值;   机器人
		const left = getStyle(this.person, 'left');
		const top = getStyle(this.person, 'top');
		this.radar(left, top, hurt);
	}

	Beaten(hurt, killUser, me) {
		if (!this.person) {
			return;
		}
		const { personInfo, dieEvent, AI } = this.props;
		hurt = (killUser.level - personInfo.level) * 0.25 + killUser.level + hurt * 0.8;
		hurt = Math.round(hurt);
		this.currentB -= (hurt || 0);
		this.currentB = this.currentB < 0 ? 0 : this.currentB;
		const percent = this.currentB / this.blood * 100 + '%';
		this.bloodLine.style.width = percent;

		if (this.currentB <= 0) {
			this.canOpera = false;
			this.timeTimeout.push(setTimeout(() => {
				dieEvent && dieEvent(this.props, killUser, me);
			}));
			let disX = getStyle(this.person, 'left');
			let disY = getStyle(this.person, 'top');
			if (!this.person) {
				return;
			}
			this.person.style.cssText = 'background: url(../../images/' + (this.defaultAction.indexOf('right') !== -1 ? 'die-right' : 'die-left') + '.gif?temp=' + Math.random() + '); background-repeat: no-repeat;background-size: cover; left:' + disX + 'px; top: ' + disY + 'px';
			let timer = null;
			this.timeInter.push(timer);
			let opacity = 1;
			this.timeTimeout.push(setTimeout(() => {
				if (!this.person) {
					clearInterval(timer);
					return;
				}
				timer = setInterval(() => {
					if (!this.person) {
						clearInterval(timer);
						return;
					}
					this.person.style.opacity = opacity;
					opacity -= 0.1;
					if (opacity <= 0) {
						clearInterval(timer);
						this.person.parentNode.removeChild(this.person) // 销毁节点
						this.person = null;
					}
				}, 100)
			}, 1200));
		}
		if (AI) {

		} else {
			window.USER.setPlay({
				name: this.props.personInfo.name,
				level: this.props.personInfo.level,
				blood: this.blood,
				currentB: this.currentB,
				magic: this.magic,
				currentM: this.currentM
			})
		}
	}
	addBlood() {

	}
	getPosition() {
		if (this.person) {
			if (!getStyle(this.person, 'left') === null) {
				return null;
			}
			return {
				left: getStyle(this.person, 'left'),
				top: getStyle(this.person, 'top')
			}
		} else {
			return null;
		}
	}
	getPlayPosition() {
		if (!this.person) {
			return null;
		}
		const PX = getStyle(this.person, 'left');
		const PY = getStyle(this.person, 'top');
		const MX = window.MapSystem.getPosition().left;
		const MY = window.MapSystem.getPosition().top;
		return {
			left: PX - MX,
			top: PY - MY
		}
	}
	showPersonInfo(e) {
		e.nativeEvent.stopImmediatePropagation();
		if (this.props.AI) {
			window.USER.setOther({ // 挨打的时候
				name: this.props.personInfo.name,
				level: this.props.personInfo.level,
				blood: this.blood,
				currentB: this.currentB,
				magic: this.magic,
				currentM: this.currentM
			})
		}
	}
	setDestory() {
		if (this.person) {
			this.person.parentNode.removeChild(this.person) // 销毁节点
		}
		this.timeInter.forEach((item) => {
			clearInterval(item);
		});
		this.timeTimeout.forEach((item) => {
			clearTimeout(item);
		});
	}
	render() {
		const { personInfo, preClass } = this.props;
		const { name, seniority, level } = personInfo;
		let color = '#fff';
		let nColor = '#fff';
		// 0白名，1500 天蓝， 3000深蓝  6000+ 橙色  10000 + 金色  3000以上有称号 普通公民  优秀公民  十世好人  第一善人
		//  -500 淡红  -1000 暗色 -3000 红色   -6000 鲜红   -10000 鲜红 -1000有称号  初级暴徒  高级暴徒 穷凶极恶 血腥暴徒 
		let nickname = '普通公民';
		if (seniority >= 1500 && seniority < 3000) {
			color = '#41e0f8';
			nColor = '#c0fffd';
			nickname = '良好公民';
		} else if (seniority >= 3000 && seniority < 6000) {
			color = '#0101ec';
			nColor = '#c0fffd';
			nickname = '优秀公民';
		} else if (seniority >= 6000 && seniority < 10000) {
			color = '#feb424';
			nColor = '#8cfbf7';
			nickname = '一品善人';
		} else if (seniority >= 10000) {
			color = '#ebdd00';
			nColor = '#00fff0';
			nickname = '十世善人';
		} else if (seniority <= -500 && seniority > -1000) {
			color = '#ffb29a';
			nColor = '#ffacac';
			nickname = '初级暴徒';
		} else if (seniority <= -1000 && seniority > -3000) {
			color = '#972400';
			nickname = '高级暴徒';
			nColor = '#ff7474';
		} else if (seniority <= -3000 && seniority > -6000) {
			color = '#b50000';
			nickname = '穷凶极恶';
			nColor = '#ff2b2b';
		} else if (seniority <= -6000) {
			color = '#ff0000';
			nickname = '血腥暴徒';
			nColor = '#ff0000';
		}
		return (
			<div
				ref={c => this.person = c}
				className={`${preClass} person-warp`}
				onMouseDown={this.showPersonInfo.bind(this)}
			>
				<div className="person-info" key={this.state.reflush}>
					<div className="person-name" style={{ color }}>{name}</div>
					<div className="blood">
						<div className="wrap">
							<div ref={c => this.bloodLine = c} style={{ width: this.currentB / this.blood * 100 + '%' }} />
						</div>
					</div>
					<div className="magic">
						<div className="wrap">
							<div ref={c => this.magicLine = c} />
						</div>
					</div>
					<div className="person-level">
						<span className="level">Lv: {level}</span>
						<span className="nickname" style={{ color: nColor }}>{nickname}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Person;