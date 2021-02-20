import './time-bar.css'

class TimeBar extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback() {
        // this.devOnly()
        this.render()
    }

    devOnly(){
        // this.name = 'Christmas Instrumental Music, 2020 Christmas Hits'
    }

    render(){
        this.innerHTML = `
<div class="time-indicator">
    <div class="whole"><div class="current"></div></div>
    <div class="digital-time-current digital-time-eta"><span class="current-time">0:45</span><span class="eta">-3:21</span></div>
</div>
        `
    }
}

customElements.define('time-bar', TimeBar);

