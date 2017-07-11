import React from 'react';
import ReactDOM from 'react-dom';
import { getStyle } from '../Utils';
require('./style');
class Map extends React.Component {
	constructor(props) {
		super(props);
		this.left = -600;
		this.top = -380;
		this.timer = null;
	}
	componentDidMount() {

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
			if (this.left <= -1120) {
				this.left = -1120;
			} else if (this.left >= 0) {
				this.left = 0;
			}
			if (this.top >= 0) {
				this.top = 0;
			} else if (this.top <= -940) {
				this.top = -940;
			}
			this.background.style.backgroundPosition = this.left + 'px ' + this.top + 'px';
		}, 16)
		
	}
	render() {
		return (
			<div className="map-wrap" ref={c => this.background = c}>

			</div>
		)
	}
}

export default Map;