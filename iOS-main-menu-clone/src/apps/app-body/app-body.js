class AppBody extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        
<div class='container unselectable'>
    <div class='header'>
        <div class="left signal-bars">
            <div class="bar first-bar"></div>
            <div class="bar second-bar"></div>
            <div class="bar third-bar"></div>
            <div class="bar fourth-bar bar-not-receiving"></div>
            <!-- Network name-->
            &nbsp; <span class='network'><span class='carrier'>Verizon</span> &nbsp; <span class='network-type'>LTE</span></span>
        </div>
        <span class='center time'>4:26 PM</span><span class='right battery-power'><i class="battery-icon fa fa-battery-0"></i></span>
    </div>

    <div id="container">
        <div id="view-0" class="box left-transition">
            <div class='_search-container'><i class="material-icons icon">search</i><my-input></my-input><i class="material-icons icon mic">mic</i></div>

            <!-- old one below here-->
            <div class='search-container'>
                <!-- need to remove this div.search-container ,but taking out messes up page width, todo!-->
            </div>

            <div class="scrollable">
                <div id='up-next' class="message-center night"><div class="topleft"><button class='app-icon mini files'>21</button><span class="message-title">UP NEXT</span></div><div class="up-next">No Upcoming Events, Reminders, or Alarms</div></div>
                <!-- -->
                <div id='suggestions' class="message-center night"><div class="topleft"><button class='app-icon mini podcasts'>2</button><span class="message-title">SIRI APP SUGGESTIONS</span><span class="message-expand-button"><i class="fa fa-angle-right"></i></span>
                    <div class="grid-container">
                        <div class="icon-and-name"><button id='calculator-icon' class='app-icon calculator'></button><div class='icon-text-name'>Calculator</div></div>
                        <div class="icon-and-name"><button id='messenger' class='app-icon messenger'>1</button><div class='icon-text-name'>Messenger</div></div>
                        <div class="icon-and-name"><button id='Safari' class='app-icon safari-browser'>4</button><div class='icon-text-name'>Safari</div></div>
                        <div class="icon-and-name"><button id= 'hangouts' class='app-icon hangouts'>2</button><div class='icon-text-name'>Hangouts</div></div>

                        <!-- new row -->
                        <div class="icon-and-name expanding-row"><button id='i_message' class='app-icon i-message'>3</button><div class='icon-text-name'>Messages</div></div>
                        <div class="icon-and-name expanding-row"><button id='camera' class='app-icon camera'>4</button><div class='icon-text-name'>Camera</div></div>
                        <div class="icon-and-name expanding-row"><button id='maps' class='app-icon maps'>3</button><div class='icon-text-name'>Maps</div></div>
                        <div class="icon-and-name expanding-row"><button id='stocks' class='app-icon stocks'>3</button><div class='icon-text-name'>Stocks</div></div>
                    </div>
                </div>
                </div>
                <div class="message-center night"><div class="topleft"><button class='app-icon mini files'>2</button><span class="message-title">NEWS</span></div></div>
                <div class="message-center night"><div class="topleft"><button class='app-icon mini files'>2</button><span class="message-title">SCREEN TIME</span></div></div>
                <div class="message-center night"><div class="topleft"><button class='app-icon mini files'>2</button><span class="message-title">SCREEN TIME</span></div></div>
                <div class="message-center night"><div class="topleft"><button class='app-icon mini files'>2</button><span class="message-title">SCREEN TIME</span></div></div>
                <div class="message-center night"><div class="topleft"><button class='app-icon mini files'>2</button><span class="message-title">SCREEN TIME</span></div></div>
                <div class="message-center night"><div class="topleft"><button class='app-icon mini files'>2</button><span class="message-title">SCREEN TIME</span></div></div>
            </div>
        </div>
<!-- calculator app       -->
        <calculator-app></calculator-app>
        <!-- end-calculator-app-->


        <div id="view-1" class="grid-container box focused-position">
            <div class="icon-and-name"><button id="face-time" class='app-icon numbers'><span class='icons8-apple-logo'></span></button><div class='icon-text-name'>FaceTime</div></div>
            <div class="icon-and-name"><button id='podcasts' class='app-icon files'>2</button><div class='icon-text-name'>Calender</div></div>
            <div class="icon-and-name"><button id='photos' data-app-name='photos' class='app-icon files'>3</button><div class='icon-text-name'>Photos</div></div>
            <div class="icon-and-name"><button id='camera(0)' class='app-icon camera'>4</button><div class='icon-text-name'>Camera</div></div>

            <!-- new row -->
            <div class="icon-and-name"><button id='mail' data-app-name='mail' class='app-icon mail'><div class="app-icon-count">33,468</div></button><div class='icon-text-name'>Mail</div></div>
            <div class="icon-and-name"><button id='clock' class='app-icon clock'>2</button><div class='icon-text-name'>Clock</div></div>
            <div class="icon-and-name"><button id='maps(0)' class='app-icon maps'>3</button><div class='icon-text-name'>Maps</div></div>
            <div class="icon-and-name"><button id='weather' class='app-icon weather mail'>4</button><div class='icon-text-name'>Weather</div></div>

            <!-- new row -->
            <div class="icon-and-name"><button id='notes' class='app-icon notes'>1</button><div class='icon-text-name'>Notes</div></div>
            <div class="icon-and-name"><button id='reminders' class='app-icon reminders'>2</button><div class='icon-text-name'>Reminders</div></div>
            <div class="icon-and-name"><button id='stocks(0)' class='app-icon stocks'>3</button><div class='icon-text-name'>Stocks</div></div>
            <div class="icon-and-name"><button id='news' class='app-icon news'>4</button><div class='icon-text-name'>News</div></div>

            <!-- new row -->
            <div class="icon-and-name"><button id='tv' class='app-icon tv'></button><div class='icon-text-name'>TV</div></div>
            <div class="icon-and-name"><button id='iTunes_store' class='app-icon i-tunes-store'>2</button><div class='icon-text-name'>iTunes Store</div></div>
            <div class="icon-and-name"><button id='app_store' class='app-icon app-store'>3</button><div class='icon-text-name'>App Store</div></div>
            <div class="icon-and-name"><button id='books' class='app-icon books'>4</button><div class='icon-text-name'>Books</div></div>

            <!-- new row -->
            <div class="icon-and-name"><button id='health' class='app-icon health'></button><div class='icon-text-name'>Health</div></div>
            <div class="icon-and-name"><button id='home' class='app-icon home'>2</button><div class='icon-text-name'>Home</div></div>
            <div class="icon-and-name"><button id='wallet' class='app-icon wallet'>3</button><div class='icon-text-name'>Wallet</div></div>
            <div class="icon-and-name"><button id='settings' class='app-icon settings' data-app-name='settings'>4</button><div class='icon-text-name'>Settings</div></div>
        </div>

        <div id='view-2' class="grid-container box">
            <div class="icon-and-name"><button id='tips' class='app-icon tips'><span class='icons8-apple-logo'></span></button><div class='icon-text-name'>Tips</div></div>
            <div class="icon-and-name"><button id='podcasts(0)' class='app-icon podcasts'>2</button><div class='icon-text-name'>Podcasts</div></div>
            <div class="icon-and-name"><button id='find_my' class='app-icon find-my'>3</button><div class='icon-text-name'>Find My</div></div>
            <div class="icon-and-name"><button id='shortcuts' class='app-icon shortcuts'>4</button><div class='icon-text-name'>Shortcuts</div></div>

            <!-- new row -->
            <div class="icon-and-name"><button id='contacts' class='app-icon contacts'>1</button><div class='icon-text-name'>Contacts</div></div>
            <div class="icon-and-name"><button class='app-icon files'>2</button><div class='icon-text-name'>Files</div></div>
            <div class="icon-and-name"><button class='app-icon watch'>3</button><div class='icon-text-name'>Watch</div></div>
            <div class="icon-and-name"><button id='utilities' class='app-icon utilities' data-app-name="utilities">4</button><div class='icon-text-name'>Utilities</div></div>

            <!-- new row -->
            <div class="icon-and-name"><button class='app-icon apple-store'>1</button><div class='icon-text-name'>Apple Store</div></div>
            <div class="icon-and-name"><button class='app-icon clips'>2</button><div class='icon-text-name'>Clips</div></div>
            <div class="icon-and-name"><button class='app-icon garage-band'>3</button><div class='icon-text-name'>GarageBand</div></div>
            <div class="icon-and-name"><button class='app-icon keynote'>4</button><div class='icon-text-name'>Keynote</div></div>

            <!-- new row -->
            <div class="icon-and-name"><button class='app-icon numbers'>1</button><div class='icon-text-name'>Numbers</div></div>
            <div class="icon-and-name"><button class='app-icon pages'>2</button><div class='icon-text-name'>Pages</div></div>
            <div class="icon-and-name"><button class='app-icon i-movie'>3</button><div class='icon-text-name'>iMovie</div></div>
            <div class="icon-and-name"><button class='app-icon i-tunes-u'>4</button><div class='icon-text-name'>iTunes U</div></div>

            <!-- new row -->
            <div class="icon-and-name"><button class='app-icon audible'>1</button><div class='icon-text-name'>Audible</div></div>
            <div class="icon-and-name"><button class='app-icon bose-connect'>2</button><div class='icon-text-name'>Bose Connect</div></div>
            <div class="icon-and-name"><button class='app-icon hangouts'>3</button><div class='icon-text-name'>Hangouts</div></div>
            <div class="icon-and-name"><button class='app-icon i-heart-radio'>4</button><div class='icon-text-name'>iHeartRadio</div></div>

            <!-- new row -->
            <div class="icon-and-name"><button class='app-icon messenger'>1</button><div class='icon-text-name'>Messenger</div></div>
            <div class="icon-and-name"><button class='app-icon uber'>2</button><div class='icon-text-name'>Uber</div></div>
            <div class="icon-and-name"><button class='app-icon you-tube-music'>3</button><div class='icon-text-name'>YouTubeMusic</div></div>
            <div class="icon-and-name"><button class='app-icon rush'>4</button><div class='icon-text-name'>Rush</div></div>
          </div>

        <div id="view-3" class="grid-container box">
            <div class="icon-and-name"><button class='app-icon numbers'><span class='icons8-apple-logo'></span></button><div class='icon-text-name'>Tips</div></div>
            <div class="icon-and-name"><button class='app-icon files'>2</button><div class='icon-text-name'>Podcasts</div></div>
            <div class="icon-and-name"><button class='app-icon files'>3</button><div class='icon-text-name'>Find My</div></div>
            <div class="icon-and-name"><button class='app-icon camera'>4</button><div class='icon-text-name'>Shortcuts</div></div>

            <!-- new row -->
            <div class="icon-and-name"><button class='app-icon numbers'><span class='icons8-apple-logo'></span></button><div class='icon-text-name'>Tips</div></div>
            <div class="icon-and-name"><button class='app-icon podcasts'>2</button><div class='icon-text-name'>Podcasts</div></div>
            <div class="icon-and-name"><button class='app-icon find-my'>3</button><div class='icon-text-name'>Find My</div></div>
            <div class="icon-and-name"><button class='app-icon shortcuts'>4</button><div class='icon-text-name'>Shortcuts</div></div>
        </div>

        <div id='bottom' class="bottom focused-position box">
            <div class='indicator-dots'><span id='view-dot-0' class='dot'></span> <span id='view-dot-1' class='dot active'></span> <span id='view-dot-2' class='dot'></span> <span id='view-dot-3' class='dot'></span></div>

            <div id='bottom-grid' class='grid-container often-used-icons'>
                <!-- new row -->
                <div class="icon-and-name"><button class='app-icon make-call'>1</button></div>
                <div class="icon-and-name"><button class='app-icon safari-browser'>2</button></div>
                <div class="icon-and-name"><button class='app-icon i-message'>3</button></div>
                <div class="icon-and-name"><button class='app-icon i-tunes'>4</button></div>
            </div>
        </div>
        
        <!-- volume -->
        <div id='volume-control' class="volume-control">
            <div id='volume-level' class="volume-level"><span id='volume-icon' class="volume-icon"><i class='fas'>&#xf027;</i></i></span></div>
        </div>
    </div>
    <!-- Modal container-->
    <div id="modal-container"></div>
    <!-- slide modal -->
    <div class="slide-modal-container">
        <div id="slide-container"></div>
    </div>
    <div>

    </div>
</div>
        `
    }
}

customElements.define('app-body', AppBody)
