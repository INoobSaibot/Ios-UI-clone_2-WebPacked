import ExampleComponent from "../example-component";
import Touches from "../touch-screen/touches";

class Modal {
    constructor(id, el, from, modalRefs, ClassDelegate) {
        this.up = this.up.bind(this);
        this.id = id + '-app-modal';
        this.modalContainer = el;
        this.openedFrom = from;
        this.ClassDelegate = ClassDelegate;
        this.init(modalRefs);
        this.touchmoveRegister = new Touches(this.id, {right: this.right, up: this.up, down: this.down});
    }

    right(t) {
        console.log('right')
        console.log(t)
    }

    up(t){
        console.log('up')
        this.component.setTitle(t.upSwipeDistance)
    }

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
        this.component = new this.ClassDelegate(document.getElementById(this.id), modalRefs, this.classes);
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

export default Modal;