import { deepCopy, random } from '../Utils';
import { NoHarm, SingleAttack, GroupAttack } from './AIActionList';
let radar = null;
export const personAction = () => {
	radar = setInterval(() => {
		window.AIPersonSystem[0] && window.AIPersonSystem[0].RobatActionByXY(window.PLAYER.getPlayPosition().left, window.PLAYER.getPlayPosition().top, Math.random(), handle);
	}, 400);
}

const handle = () => {
	clearInterval(radar);
	let Item = SingleAttack[random(0, SingleAttack.length)];
	setTimeout(() => {
		personAction();
	}, Item.time);
	window.AIPersonSystem[0].RobatAttack(Item.action, Item.hurt, Item.time, Math.random());
}