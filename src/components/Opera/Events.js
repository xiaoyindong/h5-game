export const on = (dom, func, bool = false) => {
    dom.addEventListener(dom, func, bool);
}