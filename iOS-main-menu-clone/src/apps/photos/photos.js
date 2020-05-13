import './photos-app-component';
import {EventEmitter} from '../../common-components/EventEmitter/eventEmitter';

class Photos {
    // static refs = []; /* break firefox and iOS safari*/

    constructor(container, modalRefs) {
        // The constructor should only contain the boiler plate code for finding or creating the reference.
        if (typeof container.dataset.ref === 'undefined') {
            this.ref = Math.floor(Math.random()); /*cant use static for firefox and safari ios :( */
            modalRefs[this.ref] = this;
            container.dataset.ref = this.ref;
            this.init(container);
        } else {
            // If this element has already been instantiated, use the existing reference.
            return MailAppComponent.refs[container.dataset.ref];
        }
    }

    init(container) {
        this.container = container;
        this.title = this.container.dataset.title || this.container.id;
        this.render();
        EventEmitter.subscribe('debug', ()=> {
            this.container.classList.add('modal-debug-css')
        })
    }

    setTitle(title) {
        this.title = title;
        this.render();
    }

    render() {
        this.container.innerHTML = Photos.markup(this);
    }

    static markup({title}) {
        return `<photos-app class="_app-body"></photos-app>`;
    }
}

export default Photos