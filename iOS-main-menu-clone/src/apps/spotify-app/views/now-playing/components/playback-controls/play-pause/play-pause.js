import BaseFoo from "../../menu-dots/base-foo";
import './play-pause.css'


class PlayPause extends BaseFoo{
    constructor() {
        super();
        this.playing = true;
    }

    render(){
        const classStr = this.playing === true ? 'pause' : 'play'
        return `
        <button class="play-pause-btn"></button>
        `
        return `
        <div class="play-pause"><i class='fas fa-${classStr}'></i></div>
        `
    }

}

customElements.define('play-pause-control', PlayPause);
