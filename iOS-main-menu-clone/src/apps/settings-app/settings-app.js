import './settings-app.css';
import './settings-section-component/settings-section-component.css';
import './user-profile/user-profile.css'

import './settings-option-component/settings-option-component';
import './one-setting-component/one-setting-component.css';

import '../shared-components/search-box-component/search-box-component';
import '../shared-components/app-title-component/app-title-component';
import '../shared-components/user-avatar-component/user-avatar-component';
import '../shared-components/red-counter/red-counter-component';
import '../shared-components/next-button-component/next-button-component';
import '../shared-components/app-icon-component/app-icon-component';
import '../shared-components/slide-button-component/slide-button-component';
import '../shared-components/flip-switch-component/flip-switch-component';

class SettingsApp {
    // static refs = []; /* break firefox and iOS safari*/

    constructor(container, modalRefs, classDelegate) {
        // The constructor should only contain the boiler plate code for finding or creating the reference.
        if (typeof container.dataset.ref === 'undefined') {
            this.ref = Math.floor(Math.random()); /*cant use static for firefox and safari ios :( */
            modalRefs[this.ref] = this;
            container.dataset.ref = this.ref;
            this.init(container, classDelegate);
        } else {
            // If this element has already been instantiated, use the existing reference.
            return MailAppComponent.refs[container.dataset.ref];
        }
    }

    init(container, classRef) {
        this.classRef = classRef;
        this.container = container;
        this.suggestionsCount = 2;
        this.title = this.container.dataset.title || this.container.id;
        this.render();
    }

    setTitle(title) {
        this.title = title;
        this.render();
    }

    render() {
        console.log(this.classRef)
        // todo with this bit of trickery / hack, reference to own class, (js doesn't have a good .getClass() method etc.)
        // todo this now is good example of something that potentially can go into parent / super class
        this.container.innerHTML = this.classRef.markup(this);
    }

    // static getMiniIcon(){
    // todo good example of something that could be in super class potentially
    //     return smallIcon('Tips', 'tips');
    // }

    static markup({title, suggestionsCount}) {
        return `
<div class="settings-body app-body">
<!-- todo gets rid of padding with _underscore -->
<!-- todo maybe some other fixes -->
    <div class="_app-content">
        
        <div class="title-search">
            <app-title app-name="Settings"></app-title>
            <search-box></search-box>
        </div>
        
        <div class="settings-section user-profile">
            <hr>
            <div class="settings-section-content">
                <user-avatar class='user-avatar' initials="TS"></user-avatar>
                    <div class="name-and-profiles">
                        <div class="next-container"><next-button></next-button></div>
                        <div class="name">Tobias Stecker</div>
                        <div class="profile-list">Apple ID, iCloud, iTunes & App Store</div>
                        <hr>
                    </div>
                    <div class="apple-id-suggestions">
                        <span class="">Apple ID Suggestions</span>
                        <red-counter class="suggestion-count" number=${suggestionsCount}></red-counter>
                        <div class="next-container"><next-button></next-button></div>
                    </div>
                </div>
            <hr>
            </div>
            <!-- -->
<!--    <div class="settings-section">-->
<!--    <hr>-->
<!--        <div class="settings-section-content">-->
<!--        <div class="one-setting">-->
<!--            <app-icon height="3rem"></app-icon>-->
<!--            <span>-->
<!--                <settings-option><span class='setting-title-text' slot="settingTitle">Airplane Mode</span></settings-option>-->
<!--                <slide-button></slide-button>-->
<!--                <hr>-->
<!--            </span>-->
<!--        </div>-->
<!--    </div> -->
<!--    <hr>-->
<!--   </div>-->
   
   
    
    </div>
    <!-- -->
    <div class="settings-section">
    <hr>
        <div class="settings-section-content with-grid">
            <div class="grid-container">
                <div class="item2"><div class='mini-icon'></div></div>
                <div class="item3"><span class='title-text'>Airplane Mode</span></div>  
<!--                <div class="item4"><div class='slide-button'></div></div>-->
                    <div class="item4"><flip-switch></flip-switch></div>
                <div class="item5"><hr></div>
            </div>
            
            <div class="grid-container">
                <div class="item2"><div class='mini-icon'></div></div>
                <div class="item3"><span class='title-text'>Wi-Fi</span></div>  
                <div class="item4"><div class='_slide-button'>NETGEAR89-5G</div></div>
                <div class="item5"><hr></div>
            </div>
            
            <div class="grid-container">
                <div class="item2"><div class='mini-icon'></div></div>
                <div class="item3"><span class='title-text'>Airplane Mode</span></div>  
                <div class="item4"><div class='slide-button'></div></div>
                <div class="item5"><hr></div>
            </div>
         </div>
        <hr>
   </div>
</div>
`;
    }
}

export default SettingsApp;