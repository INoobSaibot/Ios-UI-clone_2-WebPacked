import './close-carat.css';

class CloseCarat extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback() {
        this.render()
    }

    render(){
        this.innerHTML = `
        <div class="close-carat"><i class="arrow down"></i><div>
        `
    }
}

customElements.define('close-carat', CloseCarat);
