import './app-title.css';

class AppTitleComponent extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const appName = this.getAttribute('app-name') || 'missing app name';
        this.innerHTML = `<div class="title">${appName}</div>`;
    }

    shrink() {
        const title = this.querySelector('.title')
        title.classList.add('shrunk')
    }

    enlarge() {
        const title = this.querySelector('.title')
        title.classList.remove('shrunk')
    }
}

customElements.define('app-title', AppTitleComponent);