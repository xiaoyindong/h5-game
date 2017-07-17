import React from 'react';
import ReactDOM from 'react-dom';
import {random } from '../Utils';
require('./style');
class Npc extends React.Component {
	constructor(props) {
		super(props);
	}
	ondblclick() {
		let src = 'm02a';
		switch (random(0, 4)) {
			case 0 : src = 'm05a'; break;
			case 1 : src = 'm05b'; break;
			case 2 : src = 'm12a'; break;
		}
		this.music.src = '../../music/' + src +'.mp3';
		this.music.load();
		this.music.play();
	}
	render() {
		return (
			<div className="npc-wrap">
				<div className="npc-body" onDoubleClick={this.ondblclick.bind(this)} />
				<audio src="" ref={(c) => this.music = c} className="audio-background" style={{ position: 'absolute', opacity: 0}}></audio>
			</div>
		)
	}
}

export default Npc;