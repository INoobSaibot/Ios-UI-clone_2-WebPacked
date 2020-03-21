class Index {
    constructor() {
        this.calculator = new Calculator();
        this.modalService = new ModalService();
        this.pan = new Pan();
        this.messages = ['up next', 'suggestions', 'news', 'screen time'];
        this.messageCenterService = new MessageCenterService(this.messages);
        this.init();
    }

    init() {
        // dev testing start at #0 search screen
        setTimeout(() => {
            this.pan.left();
        }, 250)
        // end dev only code

        const headerClock = new Clock();
        const headerBattery = new Battery();

        const volume = new Volume();


        $(".home-button").click(() => {
            this.handleHome();
        });
        $(".right-button").click(this.pan.right);
        $(".left-button").click(this.pan.left);
        $("button.app-icon").click((e) => {
            this.handleClick(e);
        });

        document.body.addEventListener('keydown', function (e) {
            e.preventDefault();
            let key = e.key;

            if (key === 'ArrowRight') {
                this.pan.right();
            } else if (key === 'ArrowLeft') {
                this.pan.left();
            } else if (key === 'ArrowUp') {
                volume.volumeUp();
            } else if (key === 'ArrowDown') {
                volume.volumeDown();
            } else if (key === 'Control') {
                this.handleHome()
            }
        }.bind(this));

        document.body.addEventListener('keyup', volume.endVolumeHold)
    }

    handleClick(e) {
        const id = e.currentTarget.id;
        const page_in_view = $('.box');

        if (id === 'calculator-icon') {
            page_in_view.toggleClass('fall-back');
            this.calculator.open();
        } else {
            this.modalService.add(id);
        }
    }

    handleHome() {
        const currently_focused_app = this.calculator;
        currently_focused_app.minimize();
        this.modalService.minimizeAllModals();
        this.pan.home();
    }
}

class MessageCenterService {
    constructor(messagesArr) {
        this.messages = messagesArr;
        this.components = [];
        this.init();
    }

    init() {
        this.messages.forEach((message)=>{
            this.components.push(new Message(message));
        })
    }
}

class Message {
    constructor(id) {
        this.id = id;
        this.elRef = $('#'+id);
        this.expanded = false;
        this.init();
    }

    init(){
        this.expandButtonElRef = this.elRef.find('.message-expand-button');
        this.expandButtonElRef.click(() => {
            this.expandClicked();
        })
        this.expandButtonElRef.on('touchstart', ()=>{
            this.expandClicked();
        })

        $('#whatever').on({ 'touchstart' : function(){ /* do something... */ } });
    }

    expandClicked(){
        if (this.expanded) {
            this.expanded = false;
            this.expandButtonElRef.removeClass('expanded');
        } else{
            this.expanded = true;
            this.expandButtonElRef.addClass('expanded');
        }

    }
}


class ModalService {
    constructor() {
        this.modals = new Array();
        this.el = $('#modal-container');
    }

    add(id) {
        const first = 0;
        const modalRequested = this.modals.filter((modal) => {
            return modal.id === id
        });
        if (modalRequested.length > 0) {
            console.log(id, 'already in modal container, is it minimized? if so focus and maximize it')
            const ourModal = modalRequested[first];
            if (ourModal.isMinimized()) {
                ourModal.maximizeAndFocus();
            }
        } else {
            this.modals.push(new Modal(id, this.el))
        }
    }

    minimizeAllModals() {
        this.modals.forEach((m) => {
            if (m.focused) {
                m.minimize();
            }
        })
    }

}

class Modal {
    constructor(id, el) {
        this.id = id;
        this.modalContainer = el;
        this.init();
    }

    init() {
        const element = document.createElement('div');
        element.classList.add('some-class')
        element.innerHTML = 'hello ' + this.id + ' modal';
        element.id = this.id;

        this.focused = true;
        this.ref = $(element).appendTo(this.modalContainer)
    }

    minimize() {
        this.toggleOpen()
    }

    maximizeAndFocus() {
        this.toggleOpen();
    }

    toggleOpen() {
        this.ref.toggleClass('some-class');
        this.ref.toggleClass('minimized');
        this.focused = !this.focused;
    }

    isMinimized() {
        return !this.focused;
    }
}

class Calculator {
    constructor() {
        this.init();
    }

    init() {
        this.el = $('#calculator-app');
        this.icon = $('#calculator-icon')
        this.icon.on('touchstart', (e) => {
            this.open();
            console.log()
        })
    }

    open() {
        this.el.removeClass('fall-back')
        this.isOpen = true;
        this.el.toggleClass('focused-position')
    }

    minimize() {
        if (this.isOpen != true) {
            return
        }
        this.isOpen = false;
        this.el.toggleClass('fall-back');
        this.el.one('transitionend', (e) => {
            this.el.toggleClass('hidden');
            this.el.toggleClass('focused-position');

            $('.fall-back').toggleClass('fall-back transition-transform');
            setTimeout(() => {
                this.el.toggleClass('hidden')
            }, 35)
        });
    }
}

class Clock {
    constructor(name) {
        // this.clockname = name;
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
    constructor() {
        this.battery_0 = 'fa-battery-0';
        this.battery_1 = 'fa-battery-1';
        this.battery_2 = 'fa-battery-2';
        this.battery_3 = 'fa-battery-3';
        this.battery_4 = 'fa-battery-4';
        this.init()
    }

    init() {
        this.el = $('.battery-icon');
        setInterval(() => {
            this.toggle();
        }, 500)
    }

    toggle() {
        if (this.el.hasClass(this.battery_0)) {
            this.el.toggleClass(this.battery_1);
            this.el.toggleClass(this.battery_0);
        } else if (this.el.hasClass(this.battery_1)) {
            this.el.toggleClass(this.battery_1);
            this.el.toggleClass(this.battery_2);
        } else if (this.el.hasClass(this.battery_2)) {
            this.el.toggleClass(this.battery_2);
            this.el.toggleClass(this.battery_3);
        } else if (this.el.hasClass(this.battery_3)) {
            this.el.toggleClass(this.battery_3);
            this.el.toggleClass(this.battery_4);
        } else if (this.el.hasClass(this.battery_4)) {
            this.el.toggleClass(this.battery_4)
            this.el.toggleClass(this.battery_0)
        }
    }
}


class Pan {
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

    constructor() {
        this.volume = 2;// 0 to 5 em
        this.volumeTimer = Date.now();
        this.init()
    }

    init() {
        this.initVolumeUpExternalButtons();
        this.intVolumeDownExternalButtons();
    }

    initVolumeUpExternalButtons() {
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
        const time = this.volumeTimer;
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
                el.removeClass('show')
                el.removeClass('skinny')
                el.removeClass('over-extended')
                el.removeClass('squished')
                icon.removeClass('small')
            }
        }, 1000)
    }
}
