class Rect {
    constructor(id) {
        const el = document.getElementById(id);
        const rect = el ? el.getBoundingClientRect() : {};
        this.left = rect.left;
        this.height = rect.height;
        this.width = rect.width;
        this.top = rect.top;
        this.bottom = rect.bottom;
        this.right = rect.right;
    }
}

export default Rect;