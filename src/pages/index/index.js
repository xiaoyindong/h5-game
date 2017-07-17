import React from 'react';
import ReactDOM from 'react-dom';
import Map from '../../components/Map';
import Person from '../../components/Person';
import Message from '../../components/Message';
import Status from '../../components/Status';
import Npc from '../../components/Npc';
import UserInfo from '../../components/UserInfo';
import { getStyle } from '../../components/Utils';
require('./style');
console.log(Npc);
window.AIPersonSystem = []; // 机器人
window.USERINFO = {
	name: '古川',
	level: 1,
	tools: [],
	seniority: 0,
	experience: 0
}
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			left: 0,
			top: 0,
			action: 'default-right',
			attack: 0,
			reflush: 5000,
			mesKey: 2000
		}
		this.Opera = true;
		this.code = [];
		this.action = 'default-right';
	}
	componentDidMount() {
		document.addEventListener('keydown', this.KeyDown.bind(this));
		document.addEventListener('keyup', this.keyUp.bind(this));
		window.StatusPerson.setMes('欢迎进入游戏');
		this.CoordiNate();
		window.BACKGROUNDMUSIC.play();
	}
	CoordiNate() {
		const timer = setInterval(() =>{
			if (this.code.length === 0) {
				clearInterval(timer);
			}
			if (!window.PLAYER.getPosition()) {
				return;
			}
			// 坐标
			const PX = window.PLAYER.getPosition().left;
			const PY = window.PLAYER.getPosition().top;
			const MX = window.MapSystem.getPosition().left;
			const MY = window.MapSystem.getPosition().top;
			const X = PX - MX;
			const Y = PY - MY;
			this.coordinate.innerHTML = '(' + X + ' ,  '+ Y + ' ) ';
		}, 300);
	}
	KeyDown(e) {
		if (!this.Opera) {
			return;
		}
		this.CoordiNate();
		// 按键
		const code = e.keyCode;
		if (code === 13 || window.EnterText) { // 阻止动作 空格键或聊天
			return;
		}
		let off = true;
		this.code.forEach((key) => {
			if (key === code) {
				off = false;
			}
		})
		if (!off) {
			return;
		}
		this.code.push(code);
		let left = 0;
		let top = 0;
		let action = '';
		this.time = 0;
		let attack = 0;
		this.code.forEach((code) => {
			switch (code) {
				case 68: left = 3; action = 'run-right2'; this.action = 'default-right'; break;
				case 65: left = -3; action = 'run-left2'; this.action = 'default-left'; break;
				case 87: top = -3; action = 'run-right2'; this.action = 'default-right'; break;
				case 83: top = 3; action = 'run-left2'; this.action = 'default-left'; break;
				case 74: action = this.action === 'default-right' ? 'fowradL-right' : 'fowradL-left'; this.time = 900; attack = 3; break;
				case 75: action = this.action === 'default-right' ? 'qianci-right' : 'qianci-left'; this.time = 900; attack = 4; break;
				case 76: action = this.action === 'default-right' ? 'lianzhao-right' : 'lianzhao-left'; this.time = 2600; attack = 5; break;
				default: action = 'default-right'; this.action = 'default-right'; break;
			}
		});
		this.code.forEach((code) => {
			if (code === 68) {
				action = 'run-right2';
			} else if (code === 65) {
				action = 'run-left2';
			}
		});
		if (attack > 0) { // 人物攻击
			window.PLAYER.PlayAction(action, this.time, this.action);
			window.PLAYER.PlayAttack(attack, this.time); // 持续多少秒攻击
		} else { // 人物动作;
			window.PLAYER.PlayAction(action, this.time, this.action);
			window.MapSystem.MapMove(left, top);
		}
	}
	keyUp(e) {
		if (!this.Opera) {
			return;
		}
		const code = e.keyCode;
		this.code.forEach((key, idx) => {
			if (key === code) {
				this.code.splice(idx, 1)
			}
		});
		if (code === 68 || code === 65 || code === 83 || code === 87) {
			let left = 0;
			let top = 0;
			let action = this.action;
			this.code.forEach((code) => {
				switch (code) {
					case 68: left = 4; action = 'run-right2'; break;
					case 65: left = -4; action = 'run-left2'; break;
					case 87: top = -4; action = 'run-right2'; break;
					case 83: top = 4; action = 'run-left2'; break;
				}
			});
			window.PLAYER.PlayAction(action, this.time, this.action);
			window.MapSystem.MapMove(left, top);
		}
	}
	dieEvent(info, killUser, me, bool) {
		if (!bool) {
			return;
		}
		this.Opera = false;
		window.PLAYER.isDie = true;
		window.MapSystem.MapMove(0, 0);
		if(confirm('满血复活')) {
			this.Opera = true;
			window.PLAYER.Resurrection();
		} else {
			window.close();
		}
	}
	getExperience(systemMes) { // 系统公告
		if (systemMes) {
			this.systemMes = systemMes;
			setTimeout(() => {
				this.systemMes = '';
				this.setState({ mesKey: this.state.mesKey++ });
			}, 6500)
		}
		this.bloodLine.style.width = (window.USERINFO.experience - (window.USERINFO.level - 1) * 1500) / 15 + '%';
		this.bloodValue.innerHTML = (window.USERINFO.experience - (window.USERINFO.level - 1) * 1500) + '/1500';
	}
	render() {
		return (
			<div id="wrap" onKeyDown={this.KeyDown.bind(this)}>
				<div className="coordinate" ref={c=> this.coordinate = c}>(0, 0)</div>
				<div className="system-message" key={this.state.mesKey}>{this.systemMes}</div>
				<UserInfo ref={c => window.USER = c} />
				<Map
					ref={c => window.MapSystem = c}
					getExperience={this.getExperience.bind(this)}
				/>
				<Person
					ref={c=> window.PLAYER = c}
					preClass={''}
					id={101}
					personInfo={window.USERINFO}
					AI={false}
					dieEvent={this.dieEvent.bind(this)}
					getExperience={this.getExperience.bind(this)}
				/>
				<Message ref={c => window.MessageSystem = c} />
				<Status ref={c => window.StatusPerson = c} />
				<div className="user-experience">
					<div className="value" ref={c => this.bloodValue = c} >{}</div>
					<div className="line-wrap">
						<div className="line" ref={c => this.bloodLine = c} />
					</div>
				</div>
				<audio src="../../music/background.mp3" className="audio-background" ref={(c) => window.BACKGROUNDMUSIC = c} loop="loop"></audio>
				<audio src="" ref={(c) => window.KILLPERSON = c} className="audio-background"></audio>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('App'));