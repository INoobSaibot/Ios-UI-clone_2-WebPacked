import './artist-name.css'

class ArtistName extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback() {
        this.devOnly()
        this.render()
    }

    devOnly(){
        this.name = 'Christmas Instrumental Music, 2020 Christmas Hits'
    }

    render(){
        this.innerHTML = `
        ${this.name}
        `
    }
}

customElements.define('artist-name', ArtistName);

