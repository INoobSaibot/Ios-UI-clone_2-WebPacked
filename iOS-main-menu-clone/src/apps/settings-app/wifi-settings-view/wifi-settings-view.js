import './wifi-settings-view.css'

class WifiSettingsView extends HTMLElement {
    constructor(classRef) {
        super();
        this.classRef = classRef;
    }

    connectedCallback(){
        this.innerHTML = 'your mom';
        this.render();
    }

    registerEvents(){
        this.onclick = () => {
            this.handleClick()
        }
    }

    handleClick(){
        //
    }

    render() {
        // todo with this bit of trickery / hack, reference to own class, (js doesn't have a good .getClass() method etc.)
        // todo this now is good example of something that potentially can go into parent / super class
        this.innerHTML = this.classRef.markup(this);
        this.afterRender()
    }

    afterRender(){
    //
        this.registerEvents()

    }


    static markup(){
        return `
<div class="section top">
    <div class="title">Wi-Fi</div>
    <hr>
</div>

<div class="section">
    <hr>
        <div class="wifi-switch">
            <div class="title-wifi">Wi-Fi</div>
            <flip-switch></flip-switch>
            <hr>
        </div>
    <hr>
</div>
<setting-section></setting-section>
        `
    }


}

customElements.define('wifi-settings-view', WifiSettingsView)

export default WifiSettingsView;