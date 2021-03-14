import BaseFoo from "../../menu-dots/base-foo";
import './play-pause.css'


class PlayPause extends BaseFoo{
    constructor() {
        super();
        // this.playing = true;
        this.color = 0;
    }

    render(){
        const classStr = this.playing === true ? 'pause' : 'play'
        const colors = 'red green purple blue'.split(' ')
        this.color += 1;
        if (this.color >= colors.length){this.color=0}
        const color = colors[this.color];

        return `
        <button class="play-pause-btn"><i class='fas fa-${classStr}' style="color:${color}"></i></button>
        `
    }

    events(){
        this.onclick = (e) => {this.handleClick(e)}
        this.subscribeEventChannel('pause-able', (be)=>{
            this.handlePauseable(be)
        });

        this.subscribeEventChannel('play-able', (be)=>{
            this.handlePlayable(be)
        });
    }

    handleClick(e){
        const dynamicEvent = this.playing === true ? 'play' : 'play'
        $(this).trigger(dynamicEvent, e)
    }

    handlePauseable(be){
        this.playing = true;
        this.somethingChanged()
    }

    handlePlayable(){
        this.playing = false;
        this.somethingChanged()
    }
}

customElements.define('play-pause-control', PlayPause);
