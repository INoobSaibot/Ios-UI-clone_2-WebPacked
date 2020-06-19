import './search-box-component.css'
class SearchBoxCompoent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div><h1>Hello world, Search Box placeholder</h1></div>`;
    }
}

customElements.define('search-box', SearchBoxCompoent);