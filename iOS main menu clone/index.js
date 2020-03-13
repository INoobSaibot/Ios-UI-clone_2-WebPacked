const Index = {
    init: function () {
        // dev testing start at #0 search screen

        // end dev only code
        this.moving = Date.now();
        this.volume =  2;// 0 to 5 em
        this.volumeTimer = Date.now();

        $(".home-button").click(this.home);
        $(".right-button").click(this.right);
        $(".left-button").click(this.left);

        document.body.addEventListener('keydown', function (e) {
            e.preventDefault();
            let key = e.key;

            if (key === 'ArrowRight') {
                this.right();
            } else if (key === 'ArrowLeft') {
                this.left();
            } else if (key === 'ArrowUp') {
                this.volumeUp();
            } else if (key === 'ArrowDown') {
               this.volumeDown();
            } else if (key === 'Control'){
                this.home();
            }
        }.bind(this));

        document.body.addEventListener('keyup', function (e) {
            e.preventDefault();
            let key = e.key;
            console.log(e);
            const el = $('#volume-control');
            const overExtended = el.hasClass('over-extended')
            const squishedDown = el.hasClass('squished-down')

            if (key === 'ArrowUp' && overExtended) {
                el.toggleClass('over-extended');
            } else if (key === 'ArrowDown' && squishedDown) {
                el.toggleClass('squished-down');
            }
        }.bind(this));

        this.touchmoveRegister(this.right, this.left, this.home);
    },

    volumeUp: function () {
        const MAX = 17.5;
        const INCREMENT = 0.60;
        this.volume += INCREMENT;
        if (this.volume > MAX) {
            this.volume = MAX;
            if(!$('#volume-control').hasClass('over-extended')) {
                $('#volume-control').toggleClass('over-extended');
            }
        }
        this.volumeChange();
    },

    volumeDown: function() {
        const MIN = 0.0;
        const DECREMENT = 0.60;
        this.volume -= DECREMENT;
        if (this.volume < MIN) {
            this.volume = MIN;
            if(!$('#volume-control').hasClass('squished-down')) {
                $('#volume-control').toggleClass('squished-down');
            }
        }
        this.volumeChange();
    },

    volumeChange() {
        const millis = this.volumeTimer = Date.now();

        let el = $('#volume-control');
        let level = $('#volume-level');
        const icon = $('#volume-icon');
        const show = el.hasClass('show');

        let nextHeight = this.volume + 'em';
        level.css({'height':nextHeight});

        if(show && el.hasClass('skinny')){
            // do nothing
        } else if(!show) {
            el.toggleClass('show')
        } else {
            el.toggleClass('skinny')
            icon.toggleClass('small');
        }

        setTimeout(() => {
            if(millis === this.volumeTimer) {
                el.toggleClass('show')
                if(el.hasClass('skinny')){
                    el.toggleClass('skinny');
                    icon.toggleClass('small');
                }
            }
        }, 1000)
    },

    home: function () {
        let now = Date.now();
        let millis = Date.now() - this.moving
        if (millis < 250) {
            return;
        } else {
            this.moving = now;
        }

        let grid_0_in_view = $('#view-0').hasClass('focused-position');
        let grid_1_in_view = $('#view-1').hasClass('focused-position');
        let grid_2_in_view = $('#view-2').hasClass('focused-position');
        let grid_3_in_view = $('#view-3').hasClass('focused-position');

        if (grid_1_in_view) {
            // do nothing, already at home
        }

        if (grid_0_in_view) {
            $('#view-0').toggleClass('left-transition');
            $('#view-0').toggleClass('focused-position');
            $('#view-dot-0').toggleClass('active');

            $('#view-1').toggleClass('focused-position');
            $('#view-dot-1').toggleClass('active');

            $('#bottom').toggleClass('focused-position');
        }

        if (grid_2_in_view) {
            $('#view-2').toggleClass('focused-position');
            $('#view-dot-2').toggleClass('active');

            $('#view-1').toggleClass('left-transition');
            $('#view-1').toggleClass('focused-position');
            $('#view-dot-1').toggleClass('active');
        }

        if (grid_3_in_view) {
            $('#view-3').toggleClass('focused-position');
            $('#view-dot-3').toggleClass('active');

            $('#view-2').toggleClass('left-transition');
            $('#view-1').toggleClass('left-transition');

            $('#view-1').toggleClass('focused-position');
            $('#view-dot-1').toggleClass('active');
        }

    },

    right: function () {
        let now = Date.now();
        let millis = Date.now() - this.moving
        if (millis < 250) {
            return;
        } else {
            this.moving = now;
        }

        let grid_0_in_view = $('#view-0').hasClass('focused-position');
        let grid_1_in_view = $('#view-1').hasClass('focused-position');
        let grid_2_in_view = $('#view-2').hasClass('focused-position');
        let grid_3_in_view = $('#view-3').hasClass('focused-position');

        if (grid_0_in_view) {
            $('#view-0').toggleClass('left-transition');
            $('#view-0').toggleClass('focused-position');
            $('#view-dot-0').toggleClass('active');

            $('#view-1').toggleClass('focused-position');
            $('#view-dot-1').toggleClass('active');

            $('#bottom').toggleClass('focused-position');
        }

        if (grid_1_in_view) {
            $('#view-1').toggleClass('left-transition');
            $('#view-1').toggleClass('focused-position');
            $('#view-dot-1').toggleClass('active');

            $('#view-2').toggleClass('focused-position');
            $('#view-dot-2').toggleClass('active');
        }
        if (grid_2_in_view) {
            $('#view-2').toggleClass('left-transition');
            $('#view-2').toggleClass('focused-position');
            $('#view-dot-2').toggleClass('active');

            $('#view-3').toggleClass('focused-position');
            $('#view-dot-3').toggleClass('active');

        }
    },

    left: function () {
        let now = Date.now();
        let millis = Date.now() - this.moving
        if (millis < 250) {
            return;
        } else {
            this.moving = now;
        }

        let grid_1_in_view = $('#view-1').hasClass('focused-position');
        let grid_2_in_view = $('#view-2').hasClass('focused-position');
        let grid_3_in_view = $('#view-3').hasClass('focused-position');

        if (grid_1_in_view) {
            $('#view-1').toggleClass('focused-position');
            $('#view-dot-1').toggleClass('active');

            $('#view-0').toggleClass('left-transition');
            $('#view-0').toggleClass('focused-position');
            $('#view-dot-0').toggleClass('active');

            $('#bottom').toggleClass('focused-position');
        } else if (grid_2_in_view) {
            $('#view-2').toggleClass('focused-position');
            $('#view-dot-2').toggleClass('active');

            $('#view-1').toggleClass('left-transition');
            $('#view-1').toggleClass('focused-position');
            $('#view-dot-1').toggleClass('active');
        } else if (grid_3_in_view) {
            $('#view-3').toggleClass('focused-position');
            $('#view-dot-3').toggleClass('active');

            $('#view-2').toggleClass('left-transition');
            $('#view-2').toggleClass('focused-position');
            $('#view-dot-2').toggleClass('active');
        } else {
            this.moving = false;
        }
    },

    touchmoveRegister: function (right, left, home) {
        let touchsurface = document.getElementById('container'),
            startX,
            startY,
            dist,
            threshold = 25, //required min distance traveled to be considered swipe
            allowedTime = 2000, // maximum time allowed to travel that distance
            elapsedTime,
            startTime;

        const handleSwipe = (isRightswipe, isLeftSwipe) => {
            if (isRightswipe) {
                left();
            } else if (isLeftSwipe) {
                right();
            } else {
                // home();
            }
        }

        touchsurface.addEventListener('touchstart', function (e) {
            const touchobj = e.changedTouches[0];
            dist = 0;
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            startTime = new Date().getTime(); // record time when finger first makes contact with surface
            e.preventDefault()
        }, false);

        touchsurface.addEventListener('touchmove', function (e) {
            e.preventDefault() // prevent scrolling when inside DIV
        }, false);

        touchsurface.addEventListener('touchmove', function (e) {
            let touchobj = e.changedTouches[0];
            dist = touchobj.pageX - startX; // get total dist traveled by finger while in contact with surface

            elapsedTime = new Date().getTime() - startTime; // get time elapsed
            // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
            let isRightSwipe = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.pageY - startY) <= 100)
            let isLeftSwipe = (elapsedTime <= allowedTime && (-dist) >= threshold && Math.abs(touchobj.pageY - startY) <= 100)

            handleSwipe(isRightSwipe, isLeftSwipe);
            e.preventDefault()
        }, false)


    }.bind(this),

    touche: function (el, callback) {

        var touchsurface = el,
            dir,
            swipeType,
            startX,
            startY,
            distX,
            distY,
            threshold = 150, //required min distance traveled to be considered swipe
            restraint = 100, // maximum distance allowed at the same time in perpendicular direction
            allowedTime = 500, // maximum time allowed to travel that distance
            elapsedTime,
            startTime,
            handletouch = callback || function (evt, dir, phase, swipetype, distance) {
            }

        touchsurface.addEventListener('touchstart', function (e) {
            var touchobj = e.changedTouches[0]
            dir = 'none'
            swipeType = 'none'
            dist = 0
            startX = touchobj.pageX
            startY = touchobj.pageY
            startTime = new Date().getTime() // record time when finger first makes contact with surface
            handletouch(e, 'none', 'start', swipeType, 0) // fire callback function with params dir="none", phase="start", swipetype="none" etc
            e.preventDefault()

        }, false)

        touchsurface.addEventListener('touchmove', function (e) {
            var touchobj = e.changedTouches[0]
            distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
            distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
            if (Math.abs(distX) > Math.abs(distY)) { // if distance traveled horizontally is greater than vertically, consider this a horizontal movement
                dir = (distX < 0) ? 'left' : 'right'
                handletouch(e, dir, 'move', swipeType, distX) // fire callback function with params dir="left|right", phase="move", swipetype="none" etc
            } else { // else consider this a vertical movement
                dir = (distY < 0) ? 'up' : 'down'
                handletouch(e, dir, 'move', swipeType, distY) // fire callback function with params dir="up|down", phase="move", swipetype="none" etc
            }
            e.preventDefault() // prevent scrolling when inside DIV
        }, false)

        touchsurface.addEventListener('touchend', function (e) {
            var touchobj = e.changedTouches[0]
            elapsedTime = new Date().getTime() - startTime // get time elapsed
            if (elapsedTime <= allowedTime) { // first condition for awipe met
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                    swipeType = dir // set swipeType to either "left" or "right"
                } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                    swipeType = dir // set swipeType to either "top" or "down"
                }
            }
            // Fire callback function with params dir="left|right|up|down", phase="end", swipetype=dir etc:
            handletouch(e, dir, 'end', swipeType, (dir == 'left' || dir == 'right') ? distX : distY)
            e.preventDefault()
        }, false)
    }
}