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
        const $el = $('#container');
        const el = document.getElementById('container')


        let startY, dist, y_dist
        $el.on('touchstart', (e) => {
            const touchobj = e.changedTouches[0];
            startY = touchobj.pageY;
            e.preventDefault();

            // this.monitorSpeed($el)
        })

        $el.on('touchmove', (e) => {
            let touchobj = e.changedTouches[0];
            y_dist = touchobj.pageY - startY; // get total dist traveled by finger while in contact with surface

            this.move($el, el, y_dist)
            startY = touchobj.pageY; // keep everything in sync
            this.touchMoveTimeStamp = e.timeStamp;
        });


        $el.on('touchend', (e) => {
            let touchobj = e.changedTouches[0];
            // y_dist = touchobj.pageY - startY; // get total dist traveled by finger while in contact with surface
            //    todo
            this.slide($el, el, y_dist, e)
        });

        $el.on('touchmove', (e) => {
            let touchobj = e.changedTouches[0];
        })
    }

    monitorSpeed($el) {
        // clearInterval(this.speedInterval);
        //
        // const time = 1000; // one second
        // let lastPosition = 0;
        // let newestPosition = 0;
        // let distance = 0;
        // let speed = 0;
        // this.speedInterval = setInterval(() => {
        //     lastPosition = newestPosition;
        //     newestPosition = this.getCurrentPosition($el);
        //     distance = newestPosition - lastPosition
        //     this.speed = distance / time;
        //
        //     // console.log(this.speed)
        // }, time)
    }

    getCurrentPosition($el) {
        return $el.scrollTop()
    }

    move($el, el, y_dist) {
        if (this.old_scroll_pos === $el.scrollTop()) {
            clearInterval(this.slideId);
            // return;
        }

        this.old_scroll_pos = $el.scrollTop()
        $el.scrollTop($el.scrollTop() - y_dist);

        el.dispatchEvent(new CustomEvent('foo', {
            detail: {
                value: $el.scrollTop()
            }
        }))
    }

    // slide($el, el, y_dist, $e){
    //     let dist = this.speed;
    //     clearInterval(this.slideId)
    //     this.slideId = setInterval( () => {
    //         this.move($el, el, -dist)
    //         // $el.scrollTop($el.scrollTop() -dist)
    //         dist *= 1.0; //0.99;
    //         // console.log(Math.abs(dist))
    //         if(Math.abs(dist) < 1){
    //             // clearInterval(this.slideId)
    //         }
    //     }, 1000/24)
    // }


    slide($el) {
        return; // doesnt work bail
        const frequency = 1000 / 60; // 60 times per second
        const velocity = 0.25;
        let newPos = $el.scrollTop() + velocity;

        $el.scrollTop(newPos)
        this.slideID = setInterval((ee) => {
                console.log(newPos)
                $el.scrollTop(newPos)
                newPos = newPos + velocity;
            }, frequency
        )

        setTimeout(() => {
            console.log('eeeeeeeeeeeeeeeee')
            clearInterval(this.slideID)
        },3000)
    }
}

export default Widget;
