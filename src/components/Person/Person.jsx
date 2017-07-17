import React from 'react';
import ReactDOM from 'react-dom';
import { deepCopy, getStyle, random, getBlood, getMagic, getExperience, getHurt, getHurtRange, ArrayPush, ArrayDelete, ArrayContains } from '../Utils';
require('./style');
import { NoHarm, SingleAttack, GroupAttack } from './AIActionList';
class Person extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reflush: 1
		}
		this.attackList = {}; // 主动攻击的用户; 用于计算主动被动;
		this.byattackList = {}; // 被动攻击的用户; 用于计算主动被动 
		this.level = props.personInfo.level;
		this.blood = getBlood(props.personInfo);
		this.magic = getMagic(props.personInfo);
		this.currentB = this.blood
		this.currentM = this.magic
		this.canOpera = true;
		this.defaultAction = 'default-right'
		this.attackTimer1 = null;
		this.attackTimer2 = null;
		this.timeInter = [];
		this.timeTimeout = [];
		this.killNum = 0;
		this.walk = true; // 自由走动过滤定时器
	}
	componentDidMount() {
		const { action, AI, left, top } = this.props;
		if (!this.person) {
			return;
		}
		this.person.style.cssText = 'background: url(../../images/' + (action || 'default-right') + '.gif?temp=' + Math.random() + '); background-repeat: no-repeat;background-size: cover; left:' + left + 'px; top: ' + top + 'px';

		if (!AI) {
			window.USER.setPlay({ // 挨打的时候
				name: this.props.personInfo.name,
				level: this.props.personInfo.level,
				blood: this.blood,
				currentB: this.currentB,
				magic: this.magic,
				currentM: this.currentM
			})
		} else {
			this.radarMove();
		}
	}
	radarMove() {
		const { seniority, level } = this.props.personInfo;
		if (this.isDie) {
			return;
		}
		let off = false;
		this.radarTime = setInterval(() => {
			if (this.isDie) {
				clearInterval(this.radarTime);
				return;
			}
			for (const id in this.byattackList) { // 被攻击的时候
				if (this.byattackList[id].person.isDie) {
					delete this.byattackList[id];
				} else if (this.byattackList[id].person.props.personInfo.level <= level) {
					let position = null;
					if (this.byattackList[id].person.props.AI) {
						position = this.byattackList[id].person.getPosition();
					} else {
						position = this.byattackList[id].person.getPlayPosition();
					}
					this.RobatActionByXY(position.left, position.top, Math.random());
					return;
				} else {
					this.RobatActionByXY(random(200, 2000), random(200, 900), Math.random());
					return;
				}
			}
			if (seniority >= 10000) { // 如果资深资历值高于 10000 则去 杀资历值低于6000的人；
				window.AIPersonSystem.forEach((person, idx) => {
					if (!person) {
						return;
					}
					if (person.isDie || person.props.personInfo.seniority > -6000) {
						delete this.byattackList[person.props.id];
					} else if (person.props.personInfo.seniority < -6000 && idx > random(0, window.AIPersonSystem.length)) {
						this.byattackList[person.props.id] = {
							person: person,
							time: (new Date()).getTime()
						}
						off = true;
						return;
					}
				});
				if (off) {
					return;
				}
			}
			if (seniority >= 6000) { // 如果资深资历值高于 6000 则去 杀资历值低于3000的人；
				window.AIPersonSystem.forEach((person, idx) => {
					if (!person) {
						return;
					}
					if (person.isDie || person.props.personInfo.seniority > -3000) {
						delete this.byattackList[person.props.id];
					} else if (person.props.personInfo.seniority < -3000 && idx > random(0, window.AIPersonSystem.length)) {
						this.byattackList[person.props.id] = {
							person: person,
							time: (new Date()).getTime()
						}
						off = true;
						return;
					}
				});
				if (off) {
					return;
				}
			}
			if (seniority >= 3000) { // 如果资深资历值高于 3000 则去 杀资历值低于1000的人；
				window.AIPersonSystem.forEach((person, idx) => {
					if (!person) {
						return;
					}
					if (person.isDie || person.props.personInfo.seniority > -1000) {
						delete this.byattackList[person.props.id];
					} else if (person.props.personInfo.seniority < -1000 && idx > random(0, window.AIPersonSystem.length)) {
						this.byattackList[person.props.id] = {
							person: person,
							time: (new Date()).getTime()
						}
						off = true;
						return;
					}
				});
				if (off) {
					return;
				}
			}
			if (seniority < -500 && seniority > -1000) { // 追杀 玩家
				this.byattackList[window.PLAYER.props.id] = {
					person: window.PLAYER,
					time: (new Date()).getTime()
				}
				return;
			}

			if (seniority <= -3000) { // 如果资深资历值低于3000 则去杀比自己等级低的人
				window.AIPersonSystem.forEach((person, idx) => {
					if (!person) {
						return;
					}
					if (person.isDie || person.props.personInfo.level > level) {
						delete this.byattackList[person.props.id];
					} else if (person.props.personInfo.level < level && idx > random(0, window.AIPersonSystem.length)) {
						this.byattackList[person.props.id] = {
							person: person,
							time: (new Date()).getTime()
						}
						off = true;
						return;
					}
				});
				if (off) {
					return;
				}
			}

			if (this.walk) { // 如果资历值 在 3000 -  -1000 之间 随意奔走;
				this.RobatActionByXY(random(200, 2000), random(200, 900), Math.random());
				return;
			}
		}, 300);
	}
	RobatActionByXY(x, y, random) {
		this.walk = false;
		clearInterval(this.moveTime);
		clearTimeout(this.attackTimer1);
		clearInterval(this.attackTimer2);
		if (this.isDie) {
			clearInterval(this.radarTime);
			return;
		}
		let action = 'default-right';
		const position = this.getPosition();
		if (!position) {
			return;
		}
		const X = position.left;
		const Y = position.top;
		const long = Math.abs(y - Y) > Math.abs(x - X) ? y + Math.abs(y - Y) : x + Math.abs(x - X);
		let time = 0;
		let left = 0;
		let top = 0;
		if (Math.abs(y - Y) > Math.abs(x - X) && Math.abs(y - Y) !== 0) { // Y 轴
			top = 3;
			time = (Math.abs(y - Y) / 3);
			if (Math.abs(x - X) !== 0) {
				left = Math.round(Math.abs(x - X) / time);
			} else {
				left = 0;
			}

		} else if (Math.abs(x - X) !== 0) { // X 轴
			left = 3;
			time = (Math.abs(x - X) / 3);
			if (Math.abs(y - Y) !== 0) {
				top = Math.round(Math.abs(y - Y) / time);
			} else {
				top = 0;
			}
		}
		const hurtRange = getHurtRange();
		if (Math.abs(x - X) <= 20 && Math.abs(y - Y) <= 15) {
			this.RobatAttack();
			clearInterval(this.moveTime);
			return;
		}
		left = x > X ? left : 0 - left;
		top = y > Y ? top : 0 - top;
		if (left > 0) {
			action = 'run-right2';
		} else if (left < 0) {
			action = 'run-left2';
		} else if (left === 0 && top > 0) {
			action = 'run-right2';
		} else if (left === 0 && top < 0) {
			action = 'run-left2';
		}
		this.moveTime = setInterval(() => {
			if (this.isDie) {
				clearInterval(this.moveTime);
				return;
			}
			if (this.currentB <= 0) { // 没血的时候静止不动;
				clearInterval(this.moveTime);
				action = action.indexOf('right') !== -1 ? 'die-right' : 'die-left';
			}
			let disX = (getStyle(this.person, 'left') + left);
			let disY = (getStyle(this.person, 'top') + top);
			if (disX < 180 || disX > 2080) {
				if (action.indexOf('right') !== -1) {
					action = action.replace('right', 'left');
				} else {
					action = action.replace('left', 'right');
				}
				left = -left;
			}
			if (disY < 220 || disY > 950) {
				top = -top;
			}
			if (!this.person) {
				return;
			}
			if (Math.abs(this.getPosition().left - x) <= 20 && Math.abs(this.getPosition().top - y) <= 15) {
				this.person.style.cssText = 'background: url(../../images/' + (action || 'default-right') + '.gif?temp=' + random + '); background-repeat: no-repeat;background-size: cover; left:' + x + 'px; top: ' + y + 'px';
				this.RobatAttack();
				clearInterval(this.moveTime);
				return;
			}
			this.person.style.cssText = 'background: url(../../images/' + (action || 'default-right') + '.gif?temp=' + random + '); background-repeat: no-repeat;background-size: cover; left:' + disX + 'px; top: ' + disY + 'px';
		}, 14);
		this.timeInter.push(this.moveTime);
	}

	componentDidUpdate(prop) {
	}

	KILLPERSON(person, id) {
		const { personInfo, AI } = this.props;
		personInfo.experience += Math.round((person.level / personInfo.level) * 50 + 160 * (5 / personInfo.level)); // 经验
		personInfo.level = parseInt(personInfo.experience / 1500) + 1; // 等级
		this.killNum += 1; // 统计杀人个数
		if (this.killNum > 0) {
			const num = this.killNum > 10 ? 10 : this.killNum;
			if (num >= 4 || !AI) {
				window.KILLPERSON.src = '../../music/fuck' + num + '.mp3';
				window.KILLPERSON.load();
				window.KILLPERSON.play();
			}
		}
		// 资历值
		if (person.seniority < 0) {
			if (!AI) {
				window.StatusPerson.setMes('你杀了恶徒,资历值提升');
			}
			personInfo.seniority += Math.round(Math.abs(person.seniority) / 300);
		} else {
			let off = this.byattackList[id] ? false : true;
			this.byattackList[id];
			if (!AI && off) {
				window.StatusPerson.setMes('你杀人了,资历值降低');
			}
			if (off) {
				personInfo.seniority -= Math.round(Math.abs(person.seniority) / 50);
			}
		}
		delete this.byattackList[id];
		delete this.attackList[id];
		if (personInfo.level > this.level) {
			this.blood = getBlood(personInfo);
			this.magic = getMagic(personInfo);
			this.currentB = this.blood
			this.currentM = this.magic
			this.bloodLine.style.width = '100%';
			this.magicLine.style.width = '100%';
			personInfo.experience = getExperience(personInfo);
			this.level = personInfo.level;
			// 升级了。系统公告
			if (!AI) {
				setTimeout(() => {
					window.USER.setPlay({
						name: this.props.personInfo.name,
						level: this.props.personInfo.level,
						blood: this.blood,
						currentB: this.currentB,
						magic: this.magic,
						currentM: this.currentM
					})
				})
				setTimeout(() => {
					window.StatusPerson.setMes('恭喜你升到了' + this.level + '级！');
				})
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
		clearTimeout(this.attackTimer1);
		clearInterval(this.attackTimer2);
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
	PlayAttack(hurt, s) { // attack 为伤害值;  玩家 s为时间
		clearTimeout(this.attackTimer1);
		clearInterval(this.attackTimer2);
		if (!s) {
			return;
		}
		const position = this.getPlayPosition();
		if (!position) {
			return;
		}
		const left = position.left;
		const top = position.top;
		let time = 0;
		this.attackTimer1 = setTimeout(() => {
			time += 800;
			if (this.isDie) {
				return;
			}
			this.radar(left, top, hurt);
			this.attackTimer2 = setInterval(() => {
				time += 550;
				if (time >= s) {
					clearInterval(this.attackTimer2);
					return;
				}
				if (this.isDie) {
					return;
				}
				this.radar(left, top, hurt);
			}, 550);
		}, 260)
		this.timeTimeout.push(this.attackTimer1);
		this.timeInter.push(this.attackTimer2);
	}

	radar(left, top, hurt) { // 雷达;
		let byAttaPerson = null;
		let off = true;
		window.AIPersonSystem.forEach((person, idx) => {
			if (!person) {
				return;
			}
			const position = person.getPosition();
			if (!position) {
				return;
			}
			const Pleft = position.left;
			const Ptop = position.top;
			if (!person.isDie && Pleft >= left - getHurtRange().X && Pleft <= left + getHurtRange().X && Ptop >= top - getHurtRange().Y && Ptop <= top + getHurtRange().Y && person.props.id !== this.props.id) {
				if (!this.byattackList[person.props.id]) {
					this.attackList[person.props.id] = {
						person: this,
						time: (new Date()).getTime()
					}
					person.byattackList[this.props.id] = {
						person: this,
						time: (new Date()).getTime()
					}
				}
				byAttaPerson = person;
				person.Beaten(hurt, this.props.personInfo, this);
				off = false;
				return;
			}
		});
		if (off) { // 打击用户
			const position = window.PLAYER.getPlayPosition();
			if (!position) {
				return;
			}
			const Pleft = position.left;
			const Ptop = position.top;
			if (!window.PLAYER.isDie && Pleft >= left - getHurtRange().X && Pleft <= left + getHurtRange().X && Ptop >= top - getHurtRange().Y && Ptop <= top + getHurtRange().Y && window.PLAYER.props.id !== this.props.id) {
				if (!this.byattackList[window.PLAYER.props.id]) {
					this.attackList[window.PLAYER.props.id] = {
						person: this,
						time: (new Date()).getTime()
					}
					if (!window.PLAYER.byattackList[this.props.id]) {
						window.StatusPerson.setMes('你正受到[' + this.props.personInfo.name + ']的攻击!');
					}
					window.PLAYER.byattackList[this.props.id] = {
						person: this,
						time: (new Date()).getTime()
					}
				}
				window.PLAYER.Beaten(hurt, this.props.personInfo, this);
			}
		}
		if (byAttaPerson && !this.props.AI) {
			window.USER.setOther({ // 挨打的时候
				name: byAttaPerson.props.personInfo.name,
				level: byAttaPerson.props.personInfo.level,
				blood: byAttaPerson.blood,
				currentB: byAttaPerson.currentB,
				magic: byAttaPerson.magic,
				currentM: byAttaPerson.currentM
			})
		}
	}
	RobatAttack(action, hurt, s, temp) { // attack 为伤害值;   机器人
		clearTimeout(this.attackTimer1);
		clearInterval(this.attackTimer2);

		clearInterval(this.radarTime);
		if (this.isDie) {
			clearTimeout(this.attackTimer1);
			clearInterval(this.radarTime);
			return;
		}
		let Item = SingleAttack[random(0, SingleAttack.length)];
		setTimeout(() => {
			this.walk = true;
			this.radarMove();
		}, Item.time);
		action = Item.action; hurt = Item.hurt; s = Item.time; temp = Math.random();
		if (this.currentB <= 0) { // 没血的时候静止不动;
			clearInterval(this.moveTime);
			action = action.indexOf('right') !== -1 ? 'die-right' : 'die-left';
		}
		if (!this.person) {
			return;
		}
		this.person.style.backgroundImage = 'url(../../images/' + (action || 'default-right') + '.gif?temp=' + temp + ')';

		if (!s) {
			return;
		}
		const left = getStyle(this.person, 'left');
		const top = getStyle(this.person, 'top');
		let time = 0;
		this.attackTimer1 = setTimeout(() => {
			time += 800;
			this.radar(left, top, hurt);
			this.attackTimer2 = setInterval(() => {
				if (this.isDie) {
					clearInterval(this.attackTimer2);
					return;
				}
				time += 500;
				if (time >= s || this.isDie) {
					clearInterval(this.attackTimer2);
					return;
				}
				if (this.isDie) {
					return;
				}
				this.radar(left, top, hurt);
			}, 500);
		}, 200)
		this.timeTimeout.push(this.attackTimer1);
		this.timeInter.push(this.attackTimer2);
	}

	Beaten(hurt, killUser, me) {
		if (!this.person || this.isDie) {
			return;
		}
		const { personInfo, dieEvent, AI } = this.props;
		hurt = getHurt(hurt, personInfo, killUser);
		this.showHurt(hurt); // 设置弹出血
		this.currentB -= (hurt || 0);
		this.currentB = this.currentB < 0 ? 0 : this.currentB;
		const percent = Math.round(this.currentB / this.blood * 100) + '%';
		this.bloodLine.style.width = percent;
		if (this.currentB <= 0) {
			this.canOpera = false;
			this.isDie = true;
			this.timeTimeout.push(setTimeout(() => {
				dieEvent && dieEvent(this.props, killUser, me, false);
			}));
			let disX = getStyle(this.person, 'left');
			let disY = getStyle(this.person, 'top');
			if (!this.person) {
				return;
			}
			this.person.style.cssText = 'background: url(../../images/' + (this.defaultAction.indexOf('right') !== -1 ? 'die-right' : 'die-left') + '.gif?temp=' + Math.random() + '); background-repeat: no-repeat;background-size: cover; left:' + disX + 'px; top: ' + disY + 'px';
			if (AI) {
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
							dieEvent && dieEvent(this.props, killUser, me, true);
							// this.person.parentNode.removeChild(this.person) // 销毁节点
							// this.person = null;
						}
					}, 100)
				}, 1200));
			}
		}
		if (!AI) {
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

	showHurt(hurt) {
		if (hurt <= 0) {
			clearTimeout(this.hurtTimer);
			this.validHurtValueshow.innerHTML = '';
			this.validHurtValueshow.className = "person-hurt-valid";
			clearTimeout(this.hurtTimer);
			this.hurtTimer = setTimeout(() => {
				if (this.validHurtValueshow) {
					this.validHurtValueshow.innerHTML = '';
					this.validHurtValueshow.className = "person-hurt-valid";
				}
			}, 500);
			this.timeTimeout.push(this.hurtTimer);
			this.validHurtValueshow.innerHTML = '未击中';
			this.validHurtValueshow.className = "person-hurt2-valid";
		} else {
			clearTimeout(this.hurtTimer);
			this.hurtValueshow.innerHTML = '';
			this.hurtValueshow.className = "person-hurt";
			clearTimeout(this.hurtTimer);
			this.hurtTimer = setTimeout(() => {
				if (this.hurtValueshow) {
					this.hurtValueshow.innerHTML = '';
					this.hurtValueshow.className = "person-hurt";
				}
			}, 500);
			this.timeTimeout.push(this.hurtTimer);
			this.hurtValueshow.innerHTML = hurt;
			this.hurtValueshow.className = "person-hurt2";
		}
	}

	Resurrection(AI) {
		this.currentB = this.blood;
		this.isDie = false;
		this.killNum = 0;
		this.bloodLine.style.width = '100%';
		this.attackList = {};
		this.byattackList = {};
		this.setState({ reflush: Math.random() });
		this.componentDidMount();
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
		// if (this.person) {
		// 	this.person.parentNode.removeChild(this.person) // 销毁节点
		// }
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
					<div className="person-hurt" ref={c => this.hurtValueshow = c} />
					<div className="person-hurt-valid" ref={c => this.validHurtValueshow = c} />
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