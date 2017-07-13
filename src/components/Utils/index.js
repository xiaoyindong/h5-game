// import Persons from './Persons';
// export const getPerson = () => {
// 	return Persons;
// }

export const getStyle = (obj, attr) => {
	if (obj.currentStyle) {
		return parseFloat(obj.currentStyle[attr]);
	}
	else {
		return parseFloat(getComputedStyle(obj, false)[attr]);
	}
}

export const on = (dom, eve, func, bool = false) => {
	dom.addEventListener(eve, func, false)
}

export const random = (Min, Max) => {
	const Range = Max - Min - 1;
	const Rand = Math.random();
	const num = Min + Math.round(Rand * Range); //四舍五入
	return num;
}
import NAME from './NAME';
export const getPerson = (Min, Max) => {
	const name = NAME[random(0, NAME.length)] + NAME[random(0, NAME.length)] + NAME[random(0, NAME.length)];
	const level = random(1, 9);
	const tools = [];
	const evil = random(1000, 2000);
	return {
		name,
		level,
		tools,
		evil
	};
}

export const radar = () => {
	// 雷达;
}