import './spotify-clone-app.css';
import './views/now-playing/now-playing';
import App from '../App/app'

class SpotifyCloneApp extends App {
    // static refs = []; /* break firefox and iOS safari*/

    constructor(container, modalRefs) {
        super();
        this.playing = false;

        // The constructor should only contain the boiler plate code for finding or creating the reference.
        if (typeof container.dataset.ref === 'undefined') {
            this.ref = Math.floor(Math.random()); /*cant use static for firefox and safari ios :( */
            modalRefs[this.ref] = this;
            container.dataset.ref = this.ref;
            this.init(container);
        } else {
            // If this element has already been instantiated, use the existing reference.
            return SpotifyCloneApp.refs[container.dataset.ref];
        }
    }

    init(container) {
        this.container = container;
        this.title = this.container.dataset.title || this.container.id;
        this.render();
        this.events()
    }

    events(){
        $(this.container).on('play', ()=>{
            this.handlePlay()
        })

        // $(this.container).on('pause', ()=>{
        //     this.handlePause()
        // })
    }

    handlePlay(){
        this.playing = !this.playing
        const dynamicEventName = this.playing === true ? 'pause-able': 'play-able';

        this.broadcastEvent(dynamicEventName)
    }

    // handlePause(){
    //     console.log('here')
    //     this.broadcastEvent('play-able')
    // }

    render() {
        this.container.innerHTML = SpotifyCloneApp.markup(this);
    }



    static markup({title}) {

        return `
<div class="spotify-clone-app app-body">
    <now-playing></now-playing>
</div>
`;
    }
}

export default SpotifyCloneApp;
