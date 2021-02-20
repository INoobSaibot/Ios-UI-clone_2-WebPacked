import LostMotionAssembly from "../../apps/lost-motion-assembly/lost-motion-assembly";
import Touches from '../touch-screen/touches'
import './modal.css';
import './multi-app-view.css'
import {EventEmitter} from '../EventEmitter/eventEmitter';
import $ from "jquery";


class Modal {
    constructor(id, el, from, modalRefs, ClassDelegate, nonStandardModal) {
        this.standardWindowedModal = nonStandardModal != true ? true : false;
        this.up = this.up.bind(this);
        this.minimize = this.minimize.bind(this);
        this.isMinimized = this.isMinimized.bind(this);
        this.id = id + '-app-modal';
        this.modalContainer = el;
        this.ClassDelegate = ClassDelegate || LostMotionAssembly;
        this.init(modalRefs);
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
        this.setupStyles();
        this.classes = 'small'
        const element = document.createElement('div');
        element.id = this.id;
        setTimeout(() => {
            this.addLittleIcon(element);
        }, 1000);
        this.ref = $(element).appendTo(this.modalContainer);
        // this.component = new this.ClassDelegate(document.getElementById(this.id), modalRefs, this.classes, this.minimize, this.isMinimized);
        this.component = new this.ClassDelegate(document.getElementById(this.id), modalRefs, this.ClassDelegate);
        this.appsModalRef = $('#' + this.id);
        this.maximizeAndFocus();
    }

    addLittleIcon(node) {
        const title = this.component.title;
        const fallBackIcon = document.createElement('div')//smallIcon(this.id, this.component.title, 'purple');
        const littleIcon = this.ClassDelegate.getMiniIcon ? this.ClassDelegate.getMiniIcon(title) : fallBackIcon;
        node.appendChild(littleIcon)
        this.multiAppViewIcon = littleIcon;
    }

    maximizeAndFocus(multiAppView) {
        const cancelInlineStyle = this.calculate_app_size_by_left_position(multiAppView);
        this.ref.css(this.smallStyle);
        if (this.standardWindowedModal) {
            this.ref.addClass('app-modal-container')
        }
        setTimeout(() => {
            this.ref.css(cancelInlineStyle);
            this.focused = true;
        })
    }

    calculate_app_size_by_left_position(multiAppView) {
        let dynamicTransform;
        let dynamicOpacity;
        if (multiAppView && this.offset === 0) {
            dynamicTransform = 'scale(0.73)'
        } else if (multiAppView && this.offset > 0) {
            dynamicOpacity = '0.5';
            // yeah and dont show that icon title!
            this.hideTitle();
        }
        const cancelInlineStyle = {
            transform: dynamicTransform || this.cancelInlineStyle.transform,
            opacity: dynamicOpacity || this.cancelInlineStyle.opacity,
            position: this.cancelInlineStyle.position,
            transition: this.cancelInlineStyle.transition
        };

        return cancelInlineStyle;
    }


    hideTitle() {
        if (this.multiAppViewIcon) {
            const el = this.ref.find('.multiAppViewIcon');
            const iconTextEl = el.find('.title');
            if (iconTextEl) {
                iconTextEl.css({'display': 'none'});
            }
        } // whats in there? we went like .style, or something like that
    }

    multiViewMaximizeAndFocus() {
        const multiView = true;
        this.maximizeAndFocus(multiView)
    }

    minimize() {
        this.halfSize(true);
        this.giveOffset(0);
        this.ref.css(this.smallStyle);
        this.ref.one('transitionend', (e) => {
            this.focused = false;
        })

    }

    isMinimized() {
        return !this.focused;
    }

    halfSize(cancel) {
        const signalTimeBatteryheader = this.ref.find('.header');

        if (!cancel) {
            this.ref.addClass('half-size');
            signalTimeBatteryheader.addClass('inactive');
            this.maximizeAndFocus(true)
        } else {
            // will trigger transition-end event, when returns to full screen.
            this.ref.removeClass('half-size');
            this.ref.css({transform: ''})
            signalTimeBatteryheader.removeClass('inactive');
        }

        this.appHalfSize(cancel);
        this.activateSwipes(cancel);
        // todo consider moving this touch tap logic to another class
        this.enableTapToMaximize();
    }

    appHalfSize(cancel) {
        if (this.component.multiAppView) {  /* does this method exist ?*/
            this.component.multiAppView(cancel) /* turn off outsideTouch etc,*/
            console.log('(∩｀-´)⊃━☆ﾟ.*･｡ﾟ this method exist wow')
        } else {/*console.log('doesnt exist ╭∩╮༼☯۝☯༽╭∩╮')*/
        }
    }

    giveOffset(offset) {
        this.moveLeft(offset)
    }

    moveLeft(distance) {
        this.offset = distance * 75;
        this.ref.css({'right': this.offset, 'left': -this.offset});
    }

    setupStyles() {
        this.smallStyle = {
            transform: 'scale(0.0)',
            opacity: '0.0',
            position: 'absolute',
            transition: 'transform 0.25s, opacity .255s, margin-top 0.25s'
        }

        this.cancelInlineStyle = {
            transform: '',
            opacity: '1.0',
            position: 'absolute',
            transition: 'transform 0.25s, opacity 0.25s, margin-top 0.25s'
        }
    }

    activateSwipes(cancel) {
        if (cancel) {
            // todo kinda a hack...
            this.multiAppView = false;
            // todo this doesn't work like designed, the idea is to stop the swipes
            // todo, from multi app view, but they still run close etc.
            // this.swipes.touchMoveUnRegister(this.id);
            // this.swipes = {}
        } else {
            this.multiAppView = true;
            this.swipes = new Touches(this.id, {
                left: this.swipeLeft,
                right: this.swipeRight,
                up: () => {
                    this.close()
                },
                down: this.swipeDown
            })
        }
    }

    enableTapToMaximize(cancel) {
        const tapHoldLimit = 2; // 2 seconds
        if (this.hasTapToMaximize) {
            return;
        }
        if (!cancel) {
            this.appsModalRef.on('click', ((e) => {
                this.handleAppModalTap(e)
            }));

            this.appsModalRef
                .on('touchstart', (e) => {
                    $(this).data('moved', '0');
                    this.start = new Date().getTime() / 1000;
                })
                .on('touchmove', (e) => {
                    $(this).data('moved', '1');
                })
                .on('touchend', (e) => {
                    if ($(this).data('moved') == 0) {
                        // HERE YOUR CODE TO EXECUTE ON TAP-EVENT
                        this.end = new Date().getTime() / 1000;
                        const elapsed = this.end - this.start
                        if (elapsed <= tapHoldLimit) {
                            this.handleAppModalTap(e);
                        }
                    }
                });
        }
        this.hasTapToMaximize = true
    }

    handleAppModalTap(e) {
        this.appsModalRef.trigger('multi-app-view-cancel', {detail: 'none'})
    }


    swipeLeft(touches) {
    }

    swipeRight(touches) {
    }

    swipeDown() {
    }

    close() {
        if (this.closedOrClosing || !this.multiAppView) {
            return;
        } else {
            this.closedOrClosing = true;
            this.pushUp()
        }

    }

    pushUp(touches) {
        let ref = $('#' + this.id)

        $(ref).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", (e) => {
            // Do something when the transition ends
            // todo this works great but should be refactored for readability
            // todo ie this is called push-up, but also shuts down the app/removes from dom.
            this.shutDownAppAndModal();
            EventEmitter.dispatch('multi-app-view-changed')
        });

        ref.addClass('move-up-off-screen')

    }

    shutDownAppAndModal() {
        const app = this;
        EventEmitter.dispatch('close-app', app)
    }

    removeFromDom() {
        setTimeout(() => {
            this.appsModalRef.remove()
        }, 250);
    }
}


export default Modal;
