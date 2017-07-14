import React from 'react';
require('./style');
class UserInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			play: 7000,
			other: 9000
		}
		this.play = {
			name: '张三',
			level: 1,
			blood: 1000,
			currentB: 1000,
			magic: 1000,
			currentM: 1000
		}
		this.other = null;
		this.timer = null;
	}
	setPlay(play) {
		this.play = play;
		this.setState({ play: this.state.play++ });
	}
	setOther(other) {
		clearTimeout(this.timer);
		this.other = other;
		this.setState({ other: this.state.other++ });
		this.timer = setTimeout(() => {
			this.other = null;
			this.setState({ other: this.state.other++ });
		}, 5500);
	}
	renderOther() {
		const { name, level, blood, currentB, magic, currentM } = this.other;
		return (
			<div className="other-user">
				<div className="play">
					<div className="photo">
						<span>Lv:{level}</span>
					</div>
					<div className="name">{name}</div>
				</div>
				<div className="play-blood">
					<div className="value">{`${currentB}/${blood}`}</div>
					<div className="wrap"><div style={{ width: (currentB / blood) * 100 + '%' }} /></div>
				</div>
				<div className="play-magic">
					<div className="value">{`${currentM}/${magic}`}</div>
					<div className="wrap"><div style={{ width: (currentM / magic) * 100 + '%' }} /></div>
				</div>
			</div>
		);
	}
	render() {
		const { name, level, blood, currentB, magic, currentM } = this.play;
		return (
			<div className="user-info-wrap">
				<div className="play-user" key={this.state.play}>
					<div className="play">
						<div className="photo">
							<span>Lv:{level}</span>
						</div>
						<div className="name">{name}</div>
					</div>
					<div className="play-blood">
						<div className="value">{`${currentB}/${blood}`}</div>
						<div className="wrap"><div style={{ width: (currentB / blood) * 100 + '%' }} /></div>
					</div>
					<div className="play-magic">
						<div className="value">{`${currentM}/${magic}`}</div>
						<div className="wrap"><div style={{ width: (currentM / magic) * 100 + '%' }} /></div>
					</div>
				</div>
				<div key={this.state.other}>
					{
						this.other ? this.renderOther() : null
					}
				</div>

			</div>
		)
	}
}

export default UserInfo;