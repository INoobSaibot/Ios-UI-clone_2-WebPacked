import './flip-switch-component.css';

class FlipSwitchComponent extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        // todo fix reason for inline style transition override
        this.innerHTML = `<div class="inner">
                            <div class="switch" style="transition: margin-left 0.18s"></div>
                          </div>
`;
        this.switch = this.querySelector(".inner");
        this.switchContainer = this.querySelector(".switch");
        this.switchOn = false;
        this.lastEvent = Date.now()
        this.registerEvents();
    }

    registerEvents(){
        this.onclick = () => {
            this.handleSwitchFlipped()
        }
        this.ontouchend = () => {
            this.handleSwitchFlipped()
        }
    }

    handleSwitchFlipped(){
        if (this.isDoubleTap()) {
            return;
        }

        this.lastEvent = Date.now()
        this.switchOn = !this.switchOn;
        if (this.switchOn) {
            this.switch.classList.add('on');
            this.switchContainer.classList.add('on')
        } else {
            this.switch.classList.remove('on')
            this.switchContainer.classList.remove('on')
        }

        this.dispatchEvent(new CustomEvent('switch-changed', { bubbles: true, detail: { on: this.switchOn } }))
    }

    isDoubleTap(){
        return this.lastEvent === Date.now()
    }
}

customElements.define('flip-switch', FlipSwitchComponent);