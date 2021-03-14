import styles from './now-playing.css'

import './components/close-carat/close-carat'
import './components/title/title'
import './components/menu-dots/menu-dots'
import './components/now-playing-image/now-playing-image'
import './components/track-title/track-title'
import './components/artist-name/artist-name'
import './components/time-bar/time-bar'
import './components/playback-controls/playback-controls'
import BaseFoo from "./components/menu-dots/base-foo";

class NowPlaying extends BaseFoo {
    constructor() {
        super();
    }

    render(){
        return `
<div class="now-playing">
    <div class="header-grid-container"><close-carat></close-carat><playing-title></playing-title><menu-dots></menu-dots></div>
    <now-playing-image style="width: 624px; height:629px;"></now-playing-image>
    <div class="title-and-artist">
        <track-title></track-title>
        <artist-name></artist-name>
    </div>
    <time-bar></time-bar>
    <div class="controls"><playback-controls></playback-controls></div>
<div>
        `
    }
}

customElements.define('now-playing', NowPlaying);
