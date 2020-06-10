import './flip-switch-component.css';

class FlipSwitchComponent extends HTMLElement {
    connectedCallback() {
        // todo fix reason for inline style transition override
        this.innerHTML = `<div>
                            <div class="inner">
                            <div class="switch" style="transition: margin-left 0.18s"></div>
                            </div>
                          </div>
`;
        this.switch = this.querySelector(".switch");
        this.switchOn = true;
        this.onclick = () => {
            this.handleSwitchFlipped()
        }
    }

    handleSwitchFlipped(){
        this.switchOn = !this.switchOn;
        if (this.switchOn) {
            this.switch.classList.add('on')
        } else {
            this.switch.classList.remove('on')
        }
        // const event = new CustomEvent('switch-changed', {
        //     detail: {
        //         on: this.switchOn === true
        //     }
        // })

    }
}

customElements.define('flip-switch', FlipSwitchComponent);