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
import '../shared-components/flip-switch-component/flip-switch-component';
import './settings-option-component/option-next-label-component/next-label-component';
import '../shared-components/next-screen-component/next-screen-component';
import '../shared-components/title-to-back-transforming-button-component/title-to-back-transforming-button-component.css';

import WifiSettingsView from "./wifi-settings-view/wifi-settings-view";
import '../shared-components/back-button/back-button-component.css'
import {EventEmitter} from "../../common-components/EventEmitter/eventEmitter";

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
            return SettingsApp.refs[container.dataset.ref];
        }
    }

    init(container, classRef) {
        this.classRef = classRef;
        this.container = container;
        this.suggestionsCount = 2;
        this.title = this.container.dataset.title || this.container.id;
        this.render();
    }

    render() {
        // todo with this bit of trickery / hack, reference to own class, (js doesn't have a good .getClass() method etc.)
        // todo this now is good example of something that potentially can go into parent / super class
        this.container.innerHTML = this.classRef.markup(this);
        this.afterRender()
    }

    afterRender() {
        // this.container.addEventListener('switch-changed', (e) => {
        //     // console.log(e.detail)
        // });
        // todo temp hack
        const wifiElement = this.container.querySelector('setting-option')
        wifiElement.addEventListener('touchstart', (e) => {
            console.log(e)
        });
        wifiElement.addEventListener('mousedown', (e) => {
            this.showNextScreen()
        });

        // todo temp hack
        // exploratory testing
        const menu_title_element = this.container.querySelector('.menu-title')
        menu_title_element.addEventListener('mousedown', (e) => this.handleMenuTitleTouch())
        menu_title_element.addEventListener('touchstart', (e) => this.handleMenuTitleTouch())

        EventEmitter.subscribe('screen-flipped', e => {
            this.handleFlip(e)
        })

        this.devOnly(wifiElement)
    }

    handleFlip() {
        const container = this.container.querySelector('.app-body')
        const isFlipped = container.getAttribute('flipped') === true.toString() ? false : true;
        // container.setAttribute('flipped', isFlipped.toString())

        const children = [container.querySelector('._app-content').children];
    }

    devOnly(el) {
        this.showNextScreen()
    }

    handleMenuTitleTouch(e) {
        const nextScreen = this.container.querySelector('next-screen')
        let next_open = nextScreen.getAttribute('show') === 'true'
        if (!next_open) {
            return
        }
        ;

        nextScreen.setAttribute('show', !next_open)
        this.transformSettingsButton()
    }

    showNextScreen() {
        const nextScreen = this.container.querySelector('next-screen')
        const itm = nextScreen.getAttribute('show')

        this.addView(nextScreen)
        nextScreen.setAttribute('show', true)
        this.transformSettingsButton()
        this.moveSearchBar();
    }

    addView(container) {
        if (container.innerHTML){
            this.wifiSettings = new WifiSettingsView(WifiSettingsView)
            container.append(this.wifiSettings);
        }
    }

    transformSettingsButton() {
        //todo write some different more broken apart code, that also doesnt rely on dom data.
        const settingsMenuTrailButton = this.container.querySelector('.title-search')
        const appTitle = settingsMenuTrailButton.querySelector('app-title')
        const menu_title_back_button = this.container.querySelector('.back-button')
        if (!settingsMenuTrailButton.classList.contains('back')) {
            settingsMenuTrailButton.classList.add('back')
            menu_title_back_button.classList.add('show-back')
            appTitle.shrink()
        } else {
            settingsMenuTrailButton.classList.remove('back')
            menu_title_back_button.classList.remove('show-back')
            appTitle.enlarge()
            this.moveSearchBar(true)
        }
    }

    moveSearchBar(moveBack) {
        // todo object level variable? use custom element property instead?
        const searchBar = this.container.querySelector('.search-box-container');
        // todo do something else to get transitions added to search bar movement...
        if (!searchBar.style.transition) {
            searchBar.style.transition = 'all 0.5s'
        }
        const move_to = moveBack ? '0' : '-200%'
        // searchBar.style.marginLeft = move_to;
        searchBar.style.marginLeft = move_to;
    }

    // static getMiniIcon(){
    // todo good example of something that could be in super class potentially
    //     return smallIcon('Tips', 'tips');
    // }

    static markup({title, suggestionsCount}) {
        return `
<div class="settings-body app-body">
    <div class="_app-content">
        
        <div class="menu-title title-search">
            <span class="back-button"><i class="fa fa-angle-left" aria-hidden="true"></i></span>
            <app-title app-name="Settings"></app-title>
        </div>
        
        <div class="search-box-container"><search-box></search-box></div>
        
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
                        <red-counter class="suggestion-count" number=${suggestionsCount|''}></red-counter>
                        <div class="next-container"><next-button></next-button></div>
                    </div>
                </div>
            <hr>
            </div>
            <!-- -->
   
    <!-- -->
    <div class="settings-section">
    <hr>
        <div class="settings-section-content with-grid">
            <div class="grid-container">
                <div class="item2"><div class='mini-icon'></div></div>
                <div class="item3"><span class='title-text'>Airplane Mode</span></div>  
                <div class="item4"><flip-switch></flip-switch></div>
                <div class="item5"><hr></div>
            </div>
            <setting-option>
            <div class="grid-container">
                <div class="item2"><div class='mini-icon blue'></div></div>
                <div class="item3"><span class='title-text'>Wi-Fi</span></div>  
                <div class="item4"><div class="right"><next-label title="NETGEAR89-5G"></next-label><next-button></next-button></div></div>
                <div class="item5"><hr></div>
            </div>
            </setting-option>
            
            <div class="grid-container">
                <div class="item2"><div class='mini-icon blue'></div></div>
                <div class="item3"><span class='title-text'>Bluetooth</span></div>  
                <div class="item4"><div class="right"><next-label title="On"></next-label><next-button></next-button></div></div>
                <div class="item5"><hr></div>
            </div>
            
            <div class="grid-container">
                <div class="item2"><div class='mini-icon green'></div></div>
                <div class="item3"><span class='title-text'>Cellular</span></div>  
                <div class="item4"><div class="right"><next-label title=""></next-label><next-button></next-button></div></div>
                <div class="item5"><hr></div>
            </div>
            
            <div class="grid-container">
                <div class="item2"><div class='mini-icon green'></div></div>
                <div class="item3"><span class='title-text'>Personal Hotspot</span></div>  
                <div class="item4"><div class="right"><next-label title="Off"></next-label><next-button></next-button></div></div>
            </div>            
         </div>
        <hr>
   </div>
   <next-screen show=false foo="99">
   </next-screen>
</div>
`;
    }
}

export default SettingsApp;
