import BaseFoo from "../menu-dots/base-foo";
import './playback-controls.css'
import './play-pause/play-pause'

class PlaybackControls extends BaseFoo{
    constructor() {
        super()
    }

    events(){
        this.onclick = (e) => {this.handleClick(e)}
    }

    handleClick(e){
        console.log(e.target)
    }

    render(){
        return `
<div class="pgrid-container">
  <div class="item11 vertical-container"><i class='vertical-center far fa-heart'></i></div>
  
  <div class="item21 vertical-container"><i class='vertical-center fas fa-step-backward'></i></div>
  <div class="item31 center vertical-container"><div class="_vertical-center"><play-pause-control></play-pause-control></div></div>
  <div class="item41 center vertical-container"><i class='vertical-center fas fa-step-forward'></i></div>
  
  <div class="item51 center vertical-container"><i class='vertical-center far fa-frown'></i></div>
  
  <div class="item61 vertical-container extras"><i class='vertical-center fas fa-broadcast-tower'></i></div>
  <!-- voids -->
  <div class="item81 vertical-container extras"><i class='vertical-center fas fa-external-link-alt'></i></div>
</div>`
    }
}

customElements.define('playback-controls', PlaybackControls);
