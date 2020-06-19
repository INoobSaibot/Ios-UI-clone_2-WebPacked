import './next-screen-component.css';

class NextScreenComponent extends HTMLElement {
    static get observedAttributes() { return ['c', 'l', 'show']; }
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `<slot name="content">NEED NAME</slot>`;
    }

    attributeChangedCallback(attrName, oldVal, newVal){
        if (attrName === 'show' && newVal === 'true') {
            this.open()
        } else if (attrName === 'show' && newVal === 'false'){
            this.close()
        }

        // console.log('attributeChangedCallback()' , attrName, oldVal, newVal)
    }

    set show(val) {
        if (val) {
            this.setAttribute('open', '')
        } else {
            this.removeAttribute('open');
        }
        this.toggleDrawer();
    }

    open(){
        this.style.marginLeft = '0';
    }

    close(){
        this.style.marginLeft = '100%';
    }
}

customElements.define('next-screen', NextScreenComponent);