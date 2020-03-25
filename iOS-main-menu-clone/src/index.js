import Calculator from './Calculator'
import $ from "jquery";
import MessageCenterService from './message-center/message-center-service';
import ModalService from "./modal/modal-service";
import Pan from './pan/pan'
import Clock from "./clock/clock";
import Battery from './battery/battery';
import Volume from "./volume/volume";
import UtilitiesApp from './apps/utilitities-app/utilitiies-app'

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
            // this.modalService.open('mail')
            this.pan.right();
            $('.utilities').click();
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
            let ClassDelegate;
            const appName = e.target.getAttribute('data-app-name');
            console.log(appName);
            if(appName === 'utilities'){
                ClassDelegate = UtilitiesApp;
            }
            this.handleIconClick(e, ClassDelegate);
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

    handleIconClick(e, ClassDelegate) {
        const id = e.currentTarget.id;
        const page_in_view = $('.box');

        if (id === 'calculator-icon') {
            page_in_view.toggleClass('fall-back');
            this.calculator.open();
        } else {
            this.modalService.open(id, e, ClassDelegate);
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

$(document).ready(function () {
    //your code here
    new Index();
});

