// import Persons from './Persons';
// export const getPerson = () => {
// 	return Persons;
// }

export const getStyle = (obj, attr) => {
	if (!obj) {
		return;
	}
	if (obj.currentStyle) {
		if (!obj) {
			return;
		}
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
	const tools = []; // 装备
	const seniority = random(-15000, 15000); // 罪恶值 0白名，1500 天蓝， 3000深蓝  6000+ 橙色  10000 + 金色
	const experience = random(100, 1500); // 经验
	const level = parseInt(experience/1500) + 1; // 等级
	return {
		name,
		level,
		tools,
		seniority,
		experience
	};
}
// 0白名，1500 天蓝， 3000深蓝  6000+ 橙色  10000 + 金色  3000以上有称号 普通公民  优秀公民  十世好人  第一善人
//  -500 淡红  -1000 暗色 -3000 红色   -6000 鲜红   -10000 鲜红 -1000有称号  初级暴徒  高级暴徒 穷凶极恶 血腥暴徒 
export const radar = () => {
	// 雷达;
}