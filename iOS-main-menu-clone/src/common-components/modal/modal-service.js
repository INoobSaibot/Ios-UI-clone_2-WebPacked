import Rect from '../rect/rect';
import Modal from './modal';
import './modal-service.css';
import {EventEmitter} from '../EventEmitter/eventEmitter'
import $ from "jquery";

class ModalService {
    constructor() {
        this.modals = new Array();
        this.el = $('#modal-container');
        this.modalRefs = new Array();
        this.registerEvents()
        // this.devOnly = true;
    }

    registerEvents() {
        EventEmitter.subscribe('close-app', (appModal) => {
            this.closeAppAndModal(appModal)
        })

        EventEmitter.subscribe('multi-app-view-changed', () => {
            setTimeout(() => {
                this.handleMultiAppViewChanged()
            })
        })

        this.el.on('multi-app-view-cancel', (e)=>{
            this.multiModalViewCancel();
        })
    }


    open(id, e, ClassDelegate, isNonStandardModalSize) {
        const openFrom = new Rect(id);
        const requestedAppModalinBackGround = this.isThatAppInBackGround(id);
        if (requestedAppModalinBackGround) {
            this.openAppFromBG(requestedAppModalinBackGround)
        } else {
            this.modals.unshift(new Modal(id, this.el, openFrom, this.modalRefs, ClassDelegate, isNonStandardModalSize))
        }
    }

    openAppFromBG(requestedAppModal) {
        if (requestedAppModal.isMinimized()) {
            requestedAppModal.maximizeAndFocus();
        }
    }

    openAppMultiView(requestedAppModal) {
        if (requestedAppModal.isMinimized()) {
            requestedAppModal.multiViewMaximizeAndFocus(true);
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
        const modalsFocused = this.focusedModals();
        if (modalsFocused.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    multiModalView() {
        this.el.addClass('multi-app-view');
        this.multiAppView = true;

        if (this.modals.length > 0) {
            this.newMultiModalView();
        } else {
            setTimeout(() => {
                this.multiModalViewCancel();
            }, 500)
        }
    }

    cancelMultiModalView() {
        this.el.removeClass('multi-app-view')
        this.multiAppView = false;
    }

    newMultiModalView() {
        this.el.addClass('multi-app-view');
        this.multiAppView = true;
        const apps = this.modals;

        let offset = 0;
        apps.forEach((modal) => {
            modal.halfSize();
            modal.giveOffset(offset);
            offset++;
            this.openAppMultiView(modal)
        })

    }


    handleMultiAppViewChanged() {
        let offset = 0;
        this.modals.forEach((modal) => {
            // modal.halfSize();
            modal.giveOffset(offset);
            offset++;
            modal.maximizeAndFocus(true)
        })
    }

    multiModalViewCancel() {
        const appModal = this.whichAppIsOpen();

        if (!appModal) {
            this.el.removeClass('multi-app-view');
            this.multiAppView = false;
            return;}
        $('#'+appModal.id).one('transitionend', (e)=>{
            console.log('(∩｀-´)⊃━☆ﾟ.*･｡ﾟ begone blur')
            this.el.removeClass('multi-app-view');
            this.multiAppView = false;
        })
        appModal.halfSize(true);
    }

    whichAppIsOpen() {
        return this.focusedModals().shift();
    }

    closeAppAndModal(closingApp) {
        closingApp.removeFromDom();
        // todo
        const modals = this.modals.filter(modal => {
            if (modal != closingApp)
                return true;
        })
        if (modals.length === 0) {
            // go home, multi-view end
            this.cancelMultiModalView();
            // dev only
            if (this.devOnly) {
                this.openSomeApps()
            }
        }
        this.modals = modals;
    }

    openSomeApps() {
        //todo
        console.log('whhahaha')
        EventEmitter.dispatch('onAllAppsClosed')
    }

    focusedModals() {
        const openModals = this.modals.filter((modal) => {
            return modal.focused === true;
        });
        return openModals;
    }

    backGroundModals() {
        const openModals = this.modals.filter((modal) => {
            return modal.focused === false;
        });
        return openModals;
    }
}

export default ModalService;
