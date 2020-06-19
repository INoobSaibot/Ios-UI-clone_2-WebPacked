import './next-label-component.css'
class NextLabelComponent extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('title') || '';
        this.innerHTML = `<div>${title}</div>`;
    }
}

customElements.define('next-label', NextLabelComponent);