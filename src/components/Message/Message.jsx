import React from 'react';
import ReactDOM from 'react-dom';
require('./style');

// {
// 	message: '第一条第一条第一条第一条第一条第一条第一条第一条第一条第一条第一条',
// 		type: 'common',
// 			from: '张三',
// 				to: 'all'
// }
class Message extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: 'none',
			reflush: 1
		}
		this.message = '';
		this.messageList = []
	}
	componentDidMount() {
		document.addEventListener('keydown', this.Enter.bind(this));
	}
	Enter(e) {
		const code = e.keyCode;
		if (code === 13) {
			if (!this.message && this.message !== '0') {
				window.EnterText = true;
				this.setState({ display: 'block' }); // 显示输入框
				this.input.focus();
			} else {
				this.addMessage(this.message, 'common', '张三', 'all');
				this.message = '';
				this.input.value = '';
				window.EnterText = false;
				this.setState({ display: 'none' }); // 隐藏输入框
			}
		}
	}
	EnterText(e) {
		this.message = e.target.value;
	}
	addMessage(message, type, from, to) {
		this.messageList.push({
			message,
			type,
			from,
			to
		})
		this.setState({ reflush: this.state.reflush += 1 }, () => {
			this.scollBottom.scrollTop = 100000;
		});
	}
	RenderMessage() {
		const messArr = [];
		this.messageList && this.messageList.forEach((item, idx) => {
			messArr.push(
				<div key={idx} className="message-price">
					<div className="info-type">[传闻]</div>
					{
						item.type === 'system' ?
						null :
						<div className="username">{`[${item.from}]`}:</div>
					}
					<div className="message-content">{item.message}</div>
				</div>
			)
		});
		return messArr;
	}
	render() {
		return (
			<div className="message-wrap">
				<div className="message-list" key={this.state.reflush} ref={c => this.scollBottom = c}>
					{
						this.RenderMessage()
					}
				</div>
				<div className="message-class">
					<button>一般</button>
					<button>世界</button>
					<button>帮会</button>
					<button>队伍</button>
					<button>好友</button>
					<button>系统</button>
				</div>
				<div className="message-send" style={{ display: this.state.display }}>
					<input type="text" onChange={this.EnterText.bind(this)} ref={c => this.input = c} />
				</div>
			</div>
		)
	}
}
export default Message;