class Index {
    constructor() {
        this.calculator = new Calculator();
        this.modalService = new ModalService();
        this.pan = new Pan('container');
        this.messages = ['up next', 'suggestions', 'news', 'screen time'];
        this.messageCenterService = new MessageCenterService(this.messages);
        this.volume = new Volume();

        this.init();
    }

    init() {
        // dev testing start at #0 search screen
        setTimeout(() => {
            // this.pan.left();
            this.modalService.open('mail')
        }, 250)
        // end dev only code

        const headerClock = new Clock();
        const headerBattery = new Battery();

        $(".home-button").click(() => {
            this.handleHome();
        });
        $(".right-button").click(this.pan.right);
        $(".left-button").click(this.pan.left);
        $("button.app-icon").click((e) => {
            this.handleIconClick(e);
        });

        const iconElement = "button.app-icon";
        $(iconElement)
            .on('touchstart', (e) => {
                $(this).data('moved', '0');
            })
            .on('touchmove', (e) => {
                $(this).data('moved', '1');
            })
            .on('touchend', (e) => {
                if ($(this).data('moved') == 0) {
                    // HERE YOUR CODE TO EXECUTE ON TAP-EVENT
                    this.handleIconClick(e);
                }
            });

        document.body.addEventListener('keydown', (e) => {
            this.handleKeyDown(e);
        });

        document.body.addEventListener('keyup', (e) => {
            this.volume.endVolumeHold(e);
        })
    }

    handleKeyDown(e) {
        e.preventDefault();
        let key = e.key;

        if (key === 'ArrowRight') {
            this.pan.right();
        } else if (key === 'ArrowLeft') {
            this.pan.left();
        } else if (key === 'ArrowUp') {
            this.volume.volumeUp();
        } else if (key === 'ArrowDown') {
            this.volume.volumeDown();
        } else if (key === 'Control') {
            this.handleHome()
        }
    }

    handleIconClick(e) {
        const id = e.currentTarget.id;
        const page_in_view = $('.box');

        if (id === 'calculator-icon') {
            page_in_view.toggleClass('fall-back');
            this.calculator.open();
        } else {
            this.modalService.open(id, e);
        }
    }

    handleHome() {
        const currently_focused_app = this.calculator;
        currently_focused_app.minimize();
        if (!this.modalService.hasFocusedModals()) {
            this.pan.home();
        } else {
            this.modalService.minimizeAllModals();
        }
    }
}

class ExampleComponent {
    // static refs = []; /* break firefox and iOS safari*/

    setTitle(title) {
        this.title = title;
        this.render();
    }

    init(container) {
        this.container = container;
        this.title = this.container.dataset.title || '';
        this.render();
    }


    render() {
        this.container.innerHTML = ExampleComponent.markup(this);
        this.container.style.color = 'red';
    }

    static markup({title}) {

        const header = `<div class='header'><div class="left signal-bars"><div class="bar first-bar"></div><div class="bar second-bar"></div><div class="bar third-bar"></div><div class="bar fourth-bar bar-not-receiving"></div>
                    <!-- Network name-->
                    &nbsp; <span class='network'><span class='carrier'>Verizon</span> &nbsp; <span class='network-type'>LTE</span></span>
                </div>
                <span class='center time'>4:26 PM</span><span class='right battery-power'><i class="battery-icon fa fa-battery-0"></i></span>
            </div>`
        const search = `<div class='_search-container'><i class="material-icons icon">search</i><input type='text' class='search-box-input' placeholder='Search'><i class="material-icons icon mic">mic</i></div>`

        const expander = `
<i class="fa fa-angle-right"></i>`
        const subject = `
<div class="subject">An Update from Best Buy</div>
`
        const emailContentPreview = `
<div class="email-content-preview">Thank you for being a valued customer, View: Web To Our Customers. Across the country...</div>
`

        const messagePreview = `
<div class="mail-message"><hr></div>
<div class="unread"></div><span class="from">Best Buy</span><div class="when-and-expander"><span class="when">3:08 AM</span><span class="expander">${expander}</span></div>
${subject}
${emailContentPreview}
`


        return `<div class="mail-body">${header}
<div class="mail-header"><span class="mail-boxes-button"><i class="fa fa-angle-left" aria-hidden="true"></i></span><div class="name">&nbsp;Mailboxes</div><div class="edit-button">Edit</div></div>
      <div class="app-content"> <h1 class="title">Inbox</h1>
      ${search}
      <div class="message-preview-content">
       ${messagePreview}
      ${messagePreview}
      ${messagePreview}
      ${messagePreview}
      ${messagePreview}
</div>
     
      </div>
     
    </div>
`;
    }

    constructor(container, modalRefs) {
        // The constructor should only contain the boiler plate code for finding or creating the reference.
        if (typeof container.dataset.ref === 'undefined') {
            this.ref = Math.floor(Math.random()); /*cant use static for firefox and safari ios :( */
            modalRefs[this.ref] = this;
            container.dataset.ref = this.ref;
            this.init(container);
        } else {
            // If this element has already been instantiated, use the existing reference.
            return ExampleComponent.refs[container.dataset.ref];
        }
    }
}

class MessageCenterService {
    constructor(messagesArr) {
        this.messages = messagesArr;
        this.components = [];
        this.init();
    }

    init() {
        this.messages.forEach((message) => {
            this.components.push(new Message(message));
        })
    }
}

class Message {
    constructor(id) {
        this.id = id;
        this.elRef = $('#' + id);
        this.expanded = false;
        this.expandButtonElRef = this.elRef.find('.message-expand-button');
        this.hiddenIconsRef = this.elRef.find('.icon-and-name.expanding-row');
        this.init();
    }

    init() {


        this.expandButtonElRef.click(() => {
            this.expandClicked();
        });
        this.expandButtonElRef.on('touchstart', () => {
            this.expandClicked();
        })
    }

    expandClicked() {
        if (this.expanded) {
            this.close()
        } else {
            this.open()
        }
        this.expanded = !this.expanded;
    }

    close() {
        this.expandButtonElRef.removeClass('expanded');
        this.elRef.removeClass('expanded');
        this.hiddenIconsRef.removeClass('expanded')
    }

    open() {
        this.expandButtonElRef.addClass('expanded');
        this.elRef.addClass('expanded')
        this.hiddenIconsRef.addClass('expanded')
    }
}


class ModalService {
    constructor() {
        this.modals = new Array();
        this.el = $('#modal-container');
        this.modalRefs = new Array();
    }

    open(id, e) {
        const openFrom = new Rect(id);
        const requestedAppModalinBackGround = this.isThatAppInBackGround(id);
        if (requestedAppModalinBackGround) {
            this.openAppFromBG(requestedAppModalinBackGround)
        } else {
            this.modals.push(new Modal(id, this.el, openFrom, this.modalRefs))
        }
    }

    openAppFromBG(requestedAppModal) {
        if (requestedAppModal.isMinimized()) {
            requestedAppModal.maximizeAndFocus();
        }
    }

    isThatAppInBackGround(id) {
        const first = 0;
        const modalRequested = this.modals.filter((modal) => {
            return modal.id === id + '-app-modal';
        });
        return modalRequested[first];
    }

    minimizeAllModals() {
        this.modals.forEach((m) => {
            if (m.focused) {
                m.minimize();
            }
        })
    }

    hasFocusedModals() {
        const modalsFocused = this.modals.filter((modal) => {
            return modal.focused === true;
        });
        if (modalsFocused.length > 0) {
            return true;
        } else {
            return false;
        }
    }
}

class Modal {
    constructor(id, el, from, modalRefs) {
        this.id = id + '-app-modal';
        this.modalContainer = el;
        this.openedFrom = from;
        this.init(modalRefs);
        this.touchmoveRegister = new Touches(this.id, {right: this.right, up: this.up, down: this.down});
    }

    right(t) {
        console.log('right')
        console.log(t)
    }
    //
    // up =(t) => {
    //     console.log('up')
    //     this.component.setTitle(t.upSwipeDistance)
    // }

    down(t) {
        console.log('down')
        console.log(t)
    }

    init(modalRefs) {
        this.setupStyles();
        this.classes = 'small'
        const element = document.createElement('div');
        element.id = this.id;
        element.classList.add(this.classes)
        this.ref = $(element).appendTo(this.modalContainer);
        this.component = new ExampleComponent(document.getElementById(this.id), modalRefs, this.classes);
        this.maximizeAndFocus();
    }

    maximizeAndFocus() {
        this.ref.css(this.smallStyle);
        this.ref.addClass('some-class')
        this.ref.removeClass('small')
        this.ref.css(this.cancelInlineStyle);
        this.focused = true;
    }

    minimize() {
        this.ref.css(this.smallStyle);
        this.ref.one('transitionend', (e) => {
            this.removeCssAndInline();
            this.ref.addClass('small')
            this.focused = false;
        })
    }

    removeCssAndInline() {
        this.ref.removeClass('some-class');
        this.ref.css(this.cancelInlineStyle)
    }

    isMinimized() {
        return !this.focused;
    }

    setupStyles() {
        const adjustment = -75;
        const fallback = 1000;
        let left = this.openedFrom ? this.openedFrom.left + adjustment : fallback;
        let top = this.openedFrom ? this.openedFrom.top : fallback;
        const width = this.openedFrom ? this.openedFrom.width : fallback;
        const height = this.openedFrom ? this.openedFrom.height : fallback;
        const bottom = this.openedFrom ? this.openedFrom.bottom : fallback;
        this.smallStyle = {
            left: left,
            top: top,
            width: width,
            bottom: bottom,
            height: height,
            position: 'absolute',
            fontSize: 0,
            transition: 'all .25s',
            opacity: 0.3
        };

        this.cancelInlineStyle = {
            left: '',
            top: '',
            width: '',
            bottom: '',
            height: '',
            position: 'absolute',
            fontSize: '',
            opacity: ''
        };
    }
}

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

class Calculator {
    constructor() {
        this.init();
    }

    init() {
        this.slideModalContainerRef = $('.slide-modal-container');
        this.slideContainerRef = $('#slide-container');
        this.el = $('#calculator-app');
        this.icon = $('#calculator-icon')
        this.icon.on('touchstart', (e) => {
            this.open();
        })
    }

    open() {
        if (this.focused) {
            return
        } // double tap, already open/opening;
        this.slideContainerRef.append(this.el);
        this.slideModalContainerRef.addClass('active')
        setTimeout(() => {
            this.el.removeClass('fall-back')
            this.el.toggleClass('slide-modal-focused-position ')
            this.isOpen = true;
        }, 50)
        this.focused = true
    }

    minimize() {
        this.el = $('#calculator-app');
        if (this.isOpen != true) {
            return
        }
        this.isOpen = false;

        $('body').one('transitionend', (e) => {
            this.el.toggleClass('hidden');
            this.el.toggleClass('slide-modal-focused-position');
            this.slideModalContainerRef.toggleClass('active');
            $('.fall-back').toggleClass('fall-back').addClass('transition-transform');
            setTimeout(() => {
                this.el.toggleClass('hidden')
            }, 35)
        });
        this.el.addClass('fall-back');
        this.focused = false;
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
    constructor(elementID) {
        this.init(elementID);
    }

    init(elementID) {
        $(".right-button").click(this.right);
        $(".left-button").click(this.left);

        this.moving = Date.now();
        this.touchmoveRegister = new Touches(elementID, {right: this.right, left: this.left, home: this.home});
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
}

class Touches {
    constructor(id, swipeAction) {
        this.id = id;
        this.touchmoveRegister(id)
        this.left = swipeAction.left ? swipeAction.left : this.lostMotionAssembley;
        this.right = swipeAction.right ? swipeAction.right : this.lostMotionAssembley;
        this.up = swipeAction.up ? swipeAction.up : this.lostMotionAssembley;
        this.down = swipeAction.down ? swipeAction.down : this.lostMotionAssembley;


    }

    lostMotionAssembley() {
        // do nothing
    }

    handleSwipe(touchObj) {
        if (touchObj.swipeRight) {
            this.left(touchObj);
        } else if (touchObj.swipeLeft) {
            this.right(touchObj);
        }
        if (touchObj) {
            this.up(touchObj);
        } else if (touchObj.swipeDown) {
            this.down(touchObj);
        } else {
            // this.home();
        }
    }

    touchmoveRegister(elementID) {
        let touchsurface = document.getElementById(elementID),
            startX,
            startY,
            dist,
            x_dist,
            threshold = 25, //required min distance traveled to be considered swipe
            allowedTime = 2000, // maximum time allowed to travel that distance
            elapsedTime,
            startTime;

        touchsurface.addEventListener('touchstart', function (e) {
            const touchobj = e.changedTouches[0];
            dist = 0;
            x_dist = 0;
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            startTime = new Date().getTime(); // record time when finger first makes contact with surface
            e.preventDefault()
        }, false);

        touchsurface.addEventListener('touchmove', function (e) {
            e.preventDefault() // prevent scrolling when inside DIV
        }, false);

        touchsurface.addEventListener('touchmove', (e) => {
            let touchobj = e.changedTouches[0];
            dist = touchobj.pageX - startX; // get total dist traveled by finger while in contact with surface
            x_dist = touchobj.pageY - startY;

            elapsedTime = new Date().getTime() - startTime; // get time elapsed
            // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
            let isRightSwipe = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.pageY - startY) <= 100)
            let isLeftSwipe = (elapsedTime <= allowedTime && (-dist) >= threshold && Math.abs(touchobj.pageY - startY) <= 100)
            let isUpSwipe = (elapsedTime <= allowedTime && (-x_dist) >= threshold && Math.abs(touchobj.pageX - startX) <= 100)
            let isDownSwipe = (elapsedTime <= allowedTime && x_dist >= threshold && Math.abs(touchobj.pageX - startX) <= 100);

            this.handleSwipe(new Touch(isRightSwipe, isLeftSwipe, isUpSwipe, isDownSwipe, dist, x_dist));
            e.preventDefault()
        }, false)
    }
}

class Touch {
    constructor(right, left, up, down, rightSwipeDistance, upSwipeDistance) {
        this.swipeRight = right;
        this.swipeLeft = left;
        this.swipeUp = up;
        this.swipeDown = down;
        this.rightSwipeDistance = rightSwipeDistance;
        this.upSwipeDistance = upSwipeDistance;

        const rightToLeftDist = Math.abs(rightSwipeDistance);
        const topToBotttomDistance = Math.abs(upSwipeDistance)

        if (rightToLeftDist < topToBotttomDistance) {
            this.swipeRight = this.swipeLeft = false;
        } else {
            this.swipeDown = this.swipeUp = false;
        }
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
