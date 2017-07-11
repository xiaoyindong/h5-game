import React from 'react';
import ReactDOM from 'react-dom';
import { getStyle } from '../Utils';
require('./style');
class Opera extends React.Component {
	constructor(props) {
		super(props);
		this.direction = null;
		this.defaultTop = 0;
		this.defaultLeft = 0;
	}
	componentDidMount() {
	}
	TouchStart(e) {
		e.preventDefault();
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation()
		const _x = event.changedTouches[0].pageX;
		const _y = event.changedTouches[0].pageY;
		this.move(_x, _y);
	}
	TouchMove(e) {
		e.preventDefault();
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation()
		const _x = event.changedTouches[0].pageX;;
		const _y = event.changedTouches[0].pageY;
		this.move(_x, _y);
	}
	move(x, y) {
		const offsetL = getStyle(this.direction, 'left') - 0 + 50;
		let offsetT = getStyle(this.direction, 'top') - 0 + 50;
		const offsetT2 = getStyle(this.wrap, 'top');
		offsetT += offsetT2;
		let _x = 0;
		let _y = 0;
		if (x > (offsetL + 5) && x < (offsetL + 30)) {
			_x = 1;
		}
		if (x < (offsetL - 5) && x > (offsetL - 25)) {
			_x = -1;
		}
		if (x >= (offsetL + 30)) {
			_x = 3;
		}
		if (x <= (offsetL - 25)) {
			_x = -3;
		}

		if (y > (offsetT + 5) && y < (offsetT + 30)) {
			_y = 1;
		}
		if (y < (offsetT - 5) && y > (offsetT - 30)) {
			_y = -1;
		}
		if (y >= (offsetT + 30)) {
			_y = 3;
		}
		if (y <= (offsetT - 30)) {
			_y = -3;
		}
		this.props.onChange && this.props.onChange(_x, _y);
	}
	TouchEnd(e) {
		e.preventDefault();
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation()
		this.props.stop && this.props.stop();
	}
	check(val, e) {
		console.log(val, e);
		e.preventDefault();
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		this.props.check && this.props.check(val);
	}
	render() {
		return (
			<div
				className="opera-warp"
				onTouchEnd={this.TouchEnd.bind(this)}
				// onTouchMove={this.TouchMove.bind(this)}
				ref={c => this.wrap = c}
			>
				<div className="left">
					<div
						ref={c => this.direction = c}
						className="direction"
						onTouchStart={this.TouchStart.bind(this)}>
					</div>
				</div>
				<div className="right">
					<div className="one"
					onTouchStart={this.check.bind(this, 1)}
					></div>
					<div className="two" 
					onTouchStart={this.check.bind(this, 2)}
					></div>
					<div className="three" 
					onTouchStart={this.check.bind(this, 3)}
					></div>
					<div className="four" 
					onTouchStart={this.check.bind(this, 4)}
					></div>
				</div>
			</div>
		);
	}
}

export default Opera;