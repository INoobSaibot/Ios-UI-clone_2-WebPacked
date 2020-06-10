import './slide-button-component.css';

class SlideButtonComponent extends HTMLElement {
    connectedCallback() {
        const height = this.getAttribute('height') || '33rem';
        this.innerHTML = `<div class="_next-container"><button></button></div>`;
    }
}

customElements.define('slide-button', SlideButtonComponent);