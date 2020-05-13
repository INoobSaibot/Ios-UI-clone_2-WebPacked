import header from '../../components/network-time-battery-header/network-time-battery-header';
import './lost-motion-assembly.css';
import {EventEmitter} from '../../common-components/EventEmitter/eventEmitter';
import smallIcon from "../../common-components/multi-app-view/icons/multi-app-view-icons";

class LostMotionAssembly {
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
        this.container.innerHTML = LostMotionAssembly.markup(this);
    }

    static getMiniIcon(){
        return smallIcon('Tips', 'tips');
    }

    static markup({title}) {
        const appTitle ='Collections'
        const tip =`
<div class="tip">
    <div class="tip-icon"><div class="tip-icon-content">13</div></div>
    <div class="tip-text">
        <div class="tip-title">What's New</div>
        <div class="tip-row-2">in iOS 13</div>
        <div class="tip-row-3">7 tips</div>
    </div>
    <span class="message-expand-button"><i class="fa fa-angle-right"></i></span>
    <hr>
</div>        
        `
        const tip_2 = this.tip_component('Essentials', 'Must know features you\'ll love', '9 tips');
        const tip_3 = this.tip_component('Genius Picks','Favorites from our experts','15 tips')

        return `
<div class="tips-body app-body">
    ${header}
    <div class="app-content">
        <h1 class="title">${appTitle}</h1>
        <div class="tv"><div class="upper-left"><div class="upper-left-title">TV</div><div class="upper-left-tips-number">4 tips</div></div>
            <div class="large-icon"><div class="logo"><div class="label">tv</div></div></div>
        </div>
        <div class="tips-container">
            ${tip}
            ${tip_2}
            ${tip_3}
        </div>
    </div>
</div>
`;
    }

    static tip_component(title, row_2, row_3){

        return`
<div class="tip">
    <div class="tip-icon"><div class="tip-icon-content">13</div></div>
    <div class="tip-text">
        <div class="tip-title">${title||''}</div>
        <div class="tip-row-2">${row_2 || ''}</div>
        <div class="tip-row-3">${row_3 || ''}</div>
    </div>
    <span class="message-expand-button"><i class="fa fa-angle-right"></i></span>
    <hr>
</div>        
        `
    }
}

export default LostMotionAssembly;