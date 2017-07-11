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