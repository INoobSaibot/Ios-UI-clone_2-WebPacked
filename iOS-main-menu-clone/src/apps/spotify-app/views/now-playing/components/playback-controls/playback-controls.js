import BaseFoo from "../menu-dots/base-foo";
import './playback-controls.css'
import './play-pause/play-pause'

class PlaybackControls extends BaseFoo{
    constructor() {
        super()
    }

    render(){
        return `
<div class="pgrid-container">
  <div class="item11"><span class="like-heart"><i class='far fa-heart vertical-center'></i></span></div>
  <div class="item21"><span class="back-btn" style="text-align: left;"><i class='vertical-center fas fa-step-backward'></i></span></div>
  <div class="item31" style="text-align: center;"><span><play-pause-control></play-pause-control></span></div>
  <div class="item41 forward" style="text-align: left;"><span class="forward-btn"><i class='vertical-center fas fa-step-forward'></i></span></div>
  <div class="item51" style="text-align: center;"><span class="circle-minus"><i class='far fa-frown vertical-center'></i></span></div>
  
  <div class="item61"><div class="project-to"><i class='fas fa-broadcast-tower'></i></div></div>
  <!-- voids -->
  <div class="item81"><div class="share"><i class='fas fa-external-link-alt'></i></div></div>
</div>`
    }
}

customElements.define('playback-controls', PlaybackControls);
