export const getStyle = (obj, attr) => {
	if (obj.currentStyle) {
		return parseFloat(obj.currentStyle[attr]);
	}
	else {
		return parseFloat(getComputedStyle(obj, false)[attr]);
	}
}

export const on = (dom, eve, func, bool = false) => {
	dom.addEventListener(eve,func, false)
}