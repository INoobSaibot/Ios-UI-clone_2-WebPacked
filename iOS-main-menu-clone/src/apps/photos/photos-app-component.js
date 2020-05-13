import header from '../../components/network-time-battery-header/network-time-battery-header';
import '../../components/network-time-battery-header/battery.css';
import './photos.css'
import  './my-albums.css'
import actionFooter from "./call-to-action";


class PhotosApp extends HTMLElement {
    constructor() {
        super();
        const appTitle = 'Albums'
        const seeAll = this.seeAll ? 'see-all' : '';
        const albumName = `<div class="album-name">Recents</div>`;
        const photoCount = `<div class="photo-count">1</div>`;
        const albumClassList = this.seeAll ? 'active' : 'inactive'
        const myAlbums = `<div class="my-albums-view ${albumClassList}">my albums</div>`;
        const preview = `
<div class="preview">
</div>
${albumName}
${photoCount}
`
        this.template = `
<div class="app-body">
${header}
<div class="photos-body">
    <div class="app-content">
        <div class="plus">+</div>
        <div class="title ${seeAll}">${appTitle}</div>
        <hr>
        <span class="my-albums">My Albums</span> <span id='seeAll' class="see-all-button">See All</span>
        ${preview}
        ${preview}
    </div>
    ${actionFooter}
    ${myAlbums}
    ${preview}
    ${preview}
    ${preview}
</div>
</div>
`
        this.innerHTML = this.template;
        this.seeAllBtn = this.querySelector("#seeAll");
        // this.onclick = () => {
        //     alert()
        // }

        this.seeAllBtn.onclick = (e) => {
            this.handleSeeAllClicked(e)
        }
    }


    handleClick(e){
        const clicked = e.toElement.id;
        if('seeAll' === clicked){
            this.handleSeeAllClicked();
        }
    }

    handleSeeAllClicked(e){
        console.log(e)
        this.seeAll = this.seeAll != true ? true : false;
    }

    disconnectedCallback(){
        // todo remove from dom, remove subscriptions, etc, like ng destroy
    }

    static get observedAttributes() {
        return['left']
    }

    attributeChangedCallback(attrName, oldVal, newVal){
        if (name === 'left') {
            this.updateAfterEleStyle(newVal)
        }
        console.log('attributeChangedCallback()' , attrName, oldVal, newVal)
    }
}

window.customElements.define('photos-app', PhotosApp);