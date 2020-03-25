const $ = require("jquery");

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
export default Calculator