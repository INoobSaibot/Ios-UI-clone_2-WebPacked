import Rect from '../rect/rect';
import Modal from './modal'

class ModalService {
    constructor() {
        this.modals = new Array();
        this.el = $('#modal-container');
        this.modalRefs = new Array();
    }

    open(id, e, ClassDelegate) {
        const openFrom = new Rect(id);
        const requestedAppModalinBackGround = this.isThatAppInBackGround(id);
        if (requestedAppModalinBackGround) {
            this.openAppFromBG(requestedAppModalinBackGround)
        } else {
            this.modals.push(new Modal(id, this.el, openFrom, this.modalRefs, ClassDelegate))
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

export default ModalService;