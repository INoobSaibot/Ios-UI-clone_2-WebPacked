import MailAppComponent from "../../apps/mail/mail-app-component";
import Touches from "../touch-screen/touches";
import LostMotionAssembly from "../../apps/lost-motion-assembly/lost-motion-assembly";
import './modal.css';

class Modal {
    constructor(id, el, from, modalRefs, ClassDelegate) {
        this.up = this.up.bind(this);
        this.minimize = this.minimize.bind(this);
        this.isMinimized = this.isMinimized.bind(this);
        this.id = id + '-app-modal';
        this.modalContainer = el;
        this.openedFrom = from;
        this.ClassDelegate = ClassDelegate || LostMotionAssembly;
        this.init(modalRefs);
        // this.touchmoveRegister = new Touches(this.id, {right: this.right, up: this.up, down: this.down});
    }


    right(t) {
        console.log('right')
        console.log(t)
    }

    up(t) {
        console.log('up')
        this.component.setTitle(t.upSwipeDistance)
    }

    down(t) {
        console.log('down')
        console.log(t)
    }

    init(modalRefs) {
        // this.setupStyles();
        this.setupStyles2();
        this.classes = 'small'
        const element = document.createElement('div');
        element.id = this.id;
        // element.classList.add(this.classes)
        this.ref = $(element).appendTo(this.modalContainer);
        this.component = new this.ClassDelegate(document.getElementById(this.id), modalRefs, this.classes, this.minimize, this.isMinimized);
        this.maximizeAndFocus();
    }

    maximizeAndFocus() {
        this.ref.css(this.smallStyle);
        this.ref.addClass('app-modal-container')
        // this.ref.removeClass('small')
        setTimeout(() => {
            this.ref.css(this.cancelInlineStyle);
            this.focused = true;
        })
    }

    minimize() {
        this.ref.css(this.smallStyle);
        this.ref.one('transitionend', (e) => {
            // this.removeCssAndInline();
            // this.ref.addClass('small')
            this.focused = false;
        })
    }

    removeCssAndInline() {
        // this.ref.removeClass('app-modal-container');
        this.ref.css(this.cancelInlineStyle)
    }

    isMinimized() {
        return !this.focused;
    }

    halfSize(cancel) {
        const signalTimeBatteryheader = this.ref.find('.header')
        if (!cancel) {
            this.ref.addClass('half-size');
            signalTimeBatteryheader.addClass('inactive');
        } else {
            this.ref.removeClass('half-size');
            signalTimeBatteryheader.removeClass('inactive');
        }
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

    setupStyles2() {
        this.smallStyle = {
            transform: 'scale(0.0)',
            position: 'absolute',
            transition: 'transform 0.5s'
        }

        this.cancelInlineStyle = {
            transform: '',
            position: 'absolute',
            transition: 'transform 0.5s'
        }
    }
}

export default Modal;