import './title.css'
class PlayingTitle extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback() {
        this.render()
    }

    render(){
        this.innerHTML = `
        <div class="playing-title">Classic Christmas Instrumental Music
        <div>
        `
    }
}

customElements.define('playing-title', PlayingTitle);
