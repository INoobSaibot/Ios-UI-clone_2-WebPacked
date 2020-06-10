// import header from '../../components/network-time-battery-header/network-time-battery-header';
// import './lost-motion-assembly.css';
// import {EventEmitter} from '../../common-components/EventEmitter/eventEmitter';
// import smallIcon from "../../common-components/multi-app-view/icons/multi-app-view-icons";

class SettingsApp {
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
    }

    setTitle(title) {
        this.title = title;
        this.render();
    }

    render() {
        this.container.innerHTML = SettingsApp.markup(this);
    }

    // static getMiniIcon(){
    // todo good example of something that could be in super class potentialy
    //     return smallIcon('Tips', 'tips');
    // }

    static markup({title}) {


        return `
<div class="tips-body app-body">
    <div class="app-content">
        <h1 class="title">${title}</h1>
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

export default SettingsApp;