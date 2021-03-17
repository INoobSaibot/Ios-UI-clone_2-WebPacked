import {EventEmitter} from './common-components/EventEmitter/eventEmitter';
import AppBody from './apps/app-body/app-body';
import Calculator from "./apps/calculator/Calculator";
import $ from "jquery";
import MessageCenterService from './components/message-center/message-center-service';
import ModalService from "./common-components/modal/modal-service";
import Pan from './common-components/pan/pan'
import Clock from "./components/clock/clock";
import Battery from './components/battery/battery';
import Volume from "./components/volume/volume";
import './components/external-buttons/external-buttons.css';

import './apps/shared-components/flip-switch-component/flip-switch-component'; /* todo fix css */

import SearchBarService from './components/message-center/search-bar';
import calculator_icon from "./apps/calculator/calculator-icon";
import shortcuts_icon from "./apps/short-cuts/shortcuts";
import Keyboard from './common-components/keyboard/keyboard';
import './apps/calculator/calculator_app.css'; /* current calculator implementation needs this style sheet here globally to keep it hidden/ outside viewport until opened*/
import './styles/index.css';
import './styles/icon-grid.css';
import './styles/icons.css';
import './styles/icons/tips-icon/tips-icon.css';
import './styles/icons/tips-icon/home-page-icons.css';
import './styles/slide/slide.css';
import './styles/search.css';
import './styles/message-center.css';
import './styles/app-transitions.css';

import './styles/slide-modal/slide-modal.css';
import './styles/volume_control.css';
import './common-components/screen/screen.css'

class Index {
    constructor() {
        this.calculator = new Calculator();
        this.modalService = new ModalService();
        this.pan = new Pan('container');
        this.messages = ['up next', 'suggestions', 'news', 'screen time'];
        this.messageCenterService = new MessageCenterService(this.messages);
        this.volume = new Volume();
        this.messageCenterSearchBox = new SearchBarService($('._search-container'));

        this.init();
        this.clickTimer = null;
        this.homeButtonIgnore = false;
        this.$elRef = $('#container')
        this.devOnly();
    }

    devOnly() {
        // dev testing start at #0 search screen
        // setTimeout(()=> {this.pan.right();}, 250);
        setTimeout(() => {
            // this.pan.left();
            // $('#calculator-icon').click();
            // $('my-input').click();
        }, 250);
        // this.modalService.open('spotify-clone', new Event('e'), undefined)

        $('#settings').click();
        $('#photos').click();
        $('#tips').click();

        // setTimeout(() => {
        //     this.modalService.minimizeAllModals();
        //
        // }, 250);

        // EventEmitter.subscribe('onAllAppsClosed',()=>{
        //     $('#photos').click();
        //     $('#settings').click();
        //     $('#tips').click();
        //     EventEmitter.dispatch('double-tap')
        // })

        // EventEmitter.dispatch('keyboard-testing')

        $("#external-buttons-flip-switch").click()
        const counter = document.createElement('h1')
        counter.innerText = 'nan'
        counter.id = 'foo'
        const volumeControls = $('.volume-external-buttons');
        volumeControls.append(counter)
        const cElRef = volumeControls.find('#foo')
        this.$elRef.on('foo', (($e) => {
            const value = $e.originalEvent.detail.value
            counter.innerText = parseInt(value);
        }));

        const body = document.getElementsByTagName('body')
        body[0].addEventListener('foo', (e) => {
            console.log(e)
        })
        // end dev only code
    }

    init() {
        this.setupExternalControls()
        EventEmitter.subscribe('keyboard-request', (e) => {
            this.modalService.open('on-scrn-kbd', new Event('none'), Keyboard, true)
        })
        EventEmitter.subscribe('keyboard-request_close', () => {
            this.modalService.minimizeAllModals(); // this works for now to close keyboard, will likely need more implimentation details on more cases are added, that use keybd
        })
        EventEmitter.subscribe('double-tap', () => {
            this.handleDoubleTapHome();
        });

        const headerClock = new Clock();
        const headerBattery = new Battery();

        $("button.app-icon").on('click', ((e) => {
            this.handleIconTap(e)
        }));

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
                    this.handleIconTap(e);
                }
            });

        document.body.addEventListener('keydown', (e) => {
            this.handleKeyDown(e);
        });

        document.body.addEventListener('keyup', (e) => {
            this.volume.endVolumeHold(e);
        })

        this.screen = document.querySelector('.container')
    }

    setupExternalControls() {
        this.externalControlsContainer = document.body.querySelector('.volume-external-buttons')
        document.body.querySelector('#external-buttons-flip-switch').addEventListener('switch-changed', (e) => {
            e.stopImmediatePropagation();
            this.toggleExternalButtons();
        })

        $(".home-button").click(() => {
            this.handleHome();
        });
        $(".home-button-double-tap").click(() => {
            this.handleDoubleTapHome();
        });

    }

    toggleExternalButtons() {
        this.externalControlsContainer.classList.toggle('closed')
        this.externalControlsContainer.classList.toggle('open')
    }

    handleDoubleTapHome() {
        if (this.homeButtonIgnore != true) {
            if (!this.modalService.multiAppView) {
                this.modalService.multiModalView();
            } else {
                this.modalService.multiModalViewCancel();
            }
        }
    }

    handleKeyDown(e) {
        e.preventDefault();
        let key = e.key;

        if (key === '>') {
            this.pan.right();
        } else if (key === '<') {
            this.pan.left();
        } else if (key === 'ArrowUp') {
            this.volume.volumeUp();
        } else if (key === 'ArrowDown') {
            this.volume.volumeDown();
        } else if (key === 'h') {
            this.toggleExternalButtons()
        } else if (key === 'Alt') {
            this.handleHome()
        } else if (key === 'ArrowLeft') {
            EventEmitter.dispatch(key)
        } else if (key === 'ArrowRight') {
            EventEmitter.dispatch(key)
        }
    }

    handleIconClick(e, ClassDelegate) {
        const id = e.currentTarget.id;
        const page_in_view = $('.box');

        if (id === 'calculator-icon') {
            page_in_view.toggleClass('fall-back');
            // todo it already self opens from jquery click events in its own class, needs cleaned up?
        } else {
            this.modalService.open(id, e, ClassDelegate);
        }
    }

    handleIconTap(e) {
        e.stopImmediatePropagation(); /* infinite loop, open close app :( */
        let ClassDelegate;
        // const appName = e.target.getAttribute('data-app-name');

        this.handleIconClick(e, ClassDelegate);
    }

    handleHome() {
        this.homeTap();
    }

    singleTap() {
        const currently_focused_app = this.calculator;
        currently_focused_app.minimize();

        if (!this.modalService.hasFocusedModals()) {
            this.pan.home();
        } else if (this.modalService.multiAppView) {
            this.handleDoubleTapHome();
        } else {
            this.modalService.minimizeAllModals();
        }
    }

    homeTap(event) {
        if (this.clickTimer == null) {
            this.clickTimer = setTimeout(() => {
                this.clickTimer = null;
                this.singleTap();
            }, 250)
        } else {
            clearTimeout(this.clickTimer);
            this.clickTimer = null;
            // todo I dont know why its passing calculator reference here
            EventEmitter.dispatch('double-tap', this.calculator)
        }
    }

}

$(document)
    .ready(
        function () {
            //your code here
            new Index();
            $('#calculator-icon').html(calculator_icon);
            $('#shortcuts').html(shortcuts_icon)
        }
    )
;

