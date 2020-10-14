import $ from "jquery";

class Widget {
    constructor(el) {
        // this.elRef = el;

        this.init()
    }

    init() {
        this.registerEvents()
    }

    registerEvents() {
        // todo this el is hard-coded and needs refactored;
        const el = $('#container');

        let startY, dist, y_dist
        el.on('touchstart', (e) =>{
            const touchobj = e.changedTouches[0];
            startY = touchobj.pageY;
            e.preventDefault();
        })

        el.on('touchmove', (e) =>{
            let touchobj = e.changedTouches[0];
            y_dist = touchobj.pageY - startY; // get total dist traveled by finger while in contact with surface

            el.scrollTop(el.scrollTop() -y_dist)
            startY = touchobj.pageY; // keep everything in sync
        })
    }

}

export default Widget;
