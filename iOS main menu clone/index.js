// import Clock from './clock.js'


const Index = {
    init: function () {
        // dev testing start at #0 search screen

        // end dev only code
        const headerClock = new Clock();
        const headerBattery = new Battery();
        const pan = new Pan();
        const volume = new Volume();


        $(".home-button").click(pan.home);
        $(".right-button").click(pan.right);
        $(".left-button").click(pan.left);

        document.body.addEventListener('keydown', function (e) {
            e.preventDefault();
            let key = e.key;

            if (key === 'ArrowRight') {
                pan.right();
            } else if (key === 'ArrowLeft') {
                pan.left();
            } else if (key === 'ArrowUp') {
                volume.volumeUp();
            } else if (key === 'ArrowDown') {
                volume.volumeDown();
            } else if (key === 'Control') {
                pan.home();
            }
        }.bind(this));

        document.body.addEventListener('keyup', volume.endVolumeHold)
    }
}


class Clock {
    constructor(name) {
        this.clockname = name;

        this.init()
    }

    init() {
        setInterval(this.renderTime, 1000);
    }

    renderTime() {
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        const am_pm = h > 12 ? 'PM' : 'AM';
        h = h > 12 ? h - 12 : h;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;

        const formatted = h + ":" + m + ":" + s + ' ' + am_pm;
        $('.time')[0].innerText = formatted;
    }
}

class Battery {
    static battery_0 = 'fa-battery-0';
    static battery_1 = 'fa-battery-1';
    static battery_2 = 'fa-battery-2';
    static battery_3 = 'fa-battery-3';
    static battery_4 = 'fa-battery-4';

    constructor() {
        this.init()
    }

    init() {
        this.el = $('.battery-icon');
        setInterval(() => {
            this.toggle();
        }, 500)
    }

    toggle() {
        if (this.el.hasClass(Battery.battery_0)) {
            this.el.toggleClass(Battery.battery_1);
            this.el.toggleClass(Battery.battery_0);
        } else if (this.el.hasClass(Battery.battery_1)) {
            this.el.toggleClass(Battery.battery_1);
            this.el.toggleClass(Battery.battery_2);
        } else if (this.el.hasClass(Battery.battery_2)) {
            this.el.toggleClass(Battery.battery_2);
            this.el.toggleClass(Battery.battery_3);
        } else if (this.el.hasClass(Battery.battery_3)) {
            this.el.toggleClass(Battery.battery_3);
            this.el.toggleClass(Battery.battery_4);
        } else if (this.el.hasClass(Battery.battery_4)) {
            this.el.toggleClass(Battery.battery_4)
            this.el.toggleClass(Battery.battery_0)
        }
    }
}

class Pan {
    static value = '';
    moving = Date.now();

    constructor() {
        this.init();
    }

    init() {
        $(".home-button").click(this.home);
        $(".right-button").click(this.right);
        $(".left-button").click(this.left);

        this.moving = Date.now();
        this.touchmoveRegister();
    }

    home() {
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
    }

    left() {
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
    }

    right() {
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
    }

    touchmoveRegister() {
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
                this.left();
            } else if (isLeftSwipe) {
                this.right();
            } else {
                //this.home();
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
    }
}

class Volume {
    static value = '';

    constructor() {
        this.volume = 2;// 0 to 5 em
        this.volumeTimer = Date.now();
        this.init()
    }

    init() {
        this.initVolumeUpExternalButtons();
        this.intVolumeDownExternalButtons();
    }

    initVolumeUpExternalButtons(){
        const volumeUp = $('#volume-up');
        let hold = 0;
        volumeUp.on('touchstart mousedown', () => {
            hold = setInterval(() => {
                this.volumeUp();
            }, 50);

        }).on('mouseup mouseleave touchend touchcancel', function () {
            clearTimeout(hold)
        });

        volumeUp.on('touchend mouseup mouseout', this.endVolumeHold);
    }

    intVolumeDownExternalButtons() {
        let hold;
        const volumeDown = $('#volume-down');
        volumeDown.on('touchstart mousedown', () => {
            hold = setInterval(() => {
                this.volumeDown();
            }, 50);
        }).on('mouseup mouseleave touchend touchcancel', function () {
            clearTimeout(hold)
        });
        volumeDown.on('touchend mouseup mouseout', this.endVolumeHold);
    }

    endVolumeHold(e) {
        e.preventDefault();
        let key = e.key;
        let upButton = e.target.id === 'volume-up' || 'volume-up-icon';
        let downButton = e.target.id === 'volume-down' || 'volume-down-icon';

        const el = $('#volume-control');
        const overExtended = el.hasClass('over-extended')
        const squishedDown = el.hasClass('squished-down')

        if (key === 'ArrowUp' || upButton && overExtended) {
            el.toggleClass('over-extended');
        } else if (key === 'ArrowDown' || downButton && squishedDown) {
            el.toggleClass('squished-down');
        }
    }

    volumeUp() {
        const MAX = 17.5;
        const INCREMENT = 0.90;
        this.volume += INCREMENT;
        if (this.volume > MAX) {
            this.volume = MAX;
            if (!$('#volume-control').hasClass('over-extended')) {
                $('#volume-control').toggleClass('over-extended');
            }
        }
        this.volumeChange();
    }

    volumeDown() {
        const MIN = 0.0;
        const DECREMENT = 0.90;
        this.volume -= DECREMENT;
        if (this.volume < MIN) {
            this.volume = MIN;
            if (!$('#volume-control').hasClass('squished-down')) {
                $('#volume-control').toggleClass('squished-down');
            }
        }
        this.volumeChange();
    }

    volumeChange() {
        const millis = this.volumeTimer = Date.now();

        let el = $('#volume-control');
        let level = $('#volume-level');
        const icon = $('#volume-icon');
        const show = el.hasClass('show');

        let nextHeight = this.volume + 'em';
        level.css({'height': nextHeight});

        if (show && el.hasClass('skinny')) {
            // do nothing
        } else if (!show) {
            el.toggleClass('show')
        } else {
            el.toggleClass('skinny')
            icon.toggleClass('small');
        }

        setTimeout(() => {
            if (millis === this.volumeTimer) {
                el.toggleClass('show')
                if (el.hasClass('skinny')) {
                    el.toggleClass('skinny');
                    icon.toggleClass('small');
                }
            }
        }, 1000)
    }
}
