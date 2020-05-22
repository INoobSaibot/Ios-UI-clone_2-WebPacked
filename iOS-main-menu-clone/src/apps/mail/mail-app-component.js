import './mail-message-preview.css';
import './mail.css';
import smallIcon from '../../common-components/multi-app-view/icons/multi-app-view-icons'

class MailAppComponent {
    // static refs = []; /* break firefox and iOS safari*/

    constructor(container, modalRefs) {
        // The constructor should only contain the boiler plate code for finding or creating the reference.
        if (typeof container.dataset.ref === 'undefined') {
            this.ref = Math.floor(Math.random()); /*cant use static for firefox and safari ios :( */
            modalRefs[this.ref] = this;
            container.dataset.ref = this.ref;
            this.init(container);
        } else {
            // If this element has already been instantiated, use the existing reference.
            return MailAppComponent.refs[container.dataset.ref];
        }
    }

    init(container) {
        this.container = container;
        this.contentPosition = 0;
        this.oldposition = 0;
        this.title = 'Mail';

        this.render();
        this.contentContainer = $('.message-preview-content');
        // todo should this use / start at this base container then use find,
        //  to confine node search to our immediate area, yes lol
        this.upperContentContainer = $('.above-content');
        this.registerEvents()
    }

    registerEvents() {
        this.registerTouchEvents();
    }

    registerTouchEvents() {
        this.contentContainer[0].addEventListener('touchstart', (e) => {
            this.handleTouchStart(e);
        })

        this.contentContainer[0].addEventListener('touchmove', (e) => {
            this.handleTouchMove(e);
        })

        this.contentContainer[0].addEventListener('touchend', (e) => {
            this.handleTouchEnd(e);
        })
    }


    handleTouchStart(e) {
        const touch = e.touches[0];
        this.touchStart = touch.pageY;
        this.captureSpeed()
    }

    handleTouchMove(e) {
        const touch = e.touches[0];
        const moved = (touch.pageY - this.touchStart);

        this.messagesContainerMove(moved + this.oldposition)
    }

    handleTouchEnd(e) {
        this.oldposition = this.contentPosition;
        this.velocityMove();
        clearInterval(this.speedCaptureInterval);
    }

    captureSpeed(){
        clearInterval(this.velocityInterval)
        let speed = 0;
        this.speedCaptureInterval = setInterval( () => {
            speed = this.contentPosition - this.last;
            this.last = this.contentPosition
            this.speed = speed;
        }, 40)
    }

    _moveDiv(value) {
        console.log(this.contentPosition)
        this.contentPosition += value;
        this.contentContainer.css({'margin-top': `${this.contentPosition}px`});
    }


    velocityMove() {
        let velocity = this.estimateSpeed();

        this.velocityInterval = setInterval(() => {
            if (Math.abs(velocity) > 0.1) {
                velocity *= 0.90;
                // console.log(velocity)
                // todo unify the touch move and velocity move for bounding boxes etc.
                this._moveDiv(velocity)
            } else {
                clearInterval(this.velocityInterval)
            }
        }, 20)
    }

    estimateSpeed() {
        return this.speed;
    }

    messagesContainerMove(newPosition) {
        const up = newPosition || newPosition;

        if (up || true) {
            this.contentUp(newPosition)
        } else {
            this.contentDown(newPosition)
            {
                // todo
            }
        }
    }

    contentUp(moved) {
        // todo refactor, this method looks complicated
        const wholeScreenRect = this.getRect();
        const messagesRect = this.contentContainer[0].getBoundingClientRect();
        const upperContentRect = this.upperContentContainer[0].getBoundingClientRect();
        const upperLowerCollide = messagesRect.top < upperContentRect.bottom;

        if (upperLowerCollide) {
            // messagesRect.top - upperContentRect.bottom > -10 ? console.log('boom') : console.log('ow ow ow ow')
        }

        const messagesBottom = this.contentContainer[0].getClientRects()[0].bottom;
        const bottomMessageSlideUpLimit = wholeScreenRect.bottom > (messagesBottom + moved + wholeScreenRect.height);
        const topMessageSlideDownLimit = (messagesRect.top + moved) > upperContentRect.bottom ? true : false;
        if (bottomMessageSlideUpLimit || (topMessageSlideDownLimit)) {
            bottomMessageSlideUpLimit ? this.indicateSlideUpLimit() : this.topMessageSlideDownLimit();
            clearInterval(this.velocityInterval)
            return; // stop, don't move more
        } else {
            this.contentPosition = moved;
            this.contentContainer.css({'margin-top': `${this.contentPosition}px`});
        }

    }

    indicateSlideUpLimit() {
        // todo
        console.log('whoah slow down')
    }

    topMessageSlideDownLimit() {
        // todo
        console.log('trying to pull down to far')
    }

    contentDown() {
        // todo
    }

    getRect() {
        const first = 0;
        return this.container.getClientRects()[first];
    }

    render() {
        this.container.innerHTML = MailAppComponent.markup(this);
    }

    static getMiniIcon(title) {
        return smallIcon(title, 'mail');
    }

    static markup({title, contentPosition}) {
        const header = `<div class='header'><div class="left signal-bars"><div class="bar first-bar"></div><div class="bar second-bar"></div><div class="bar third-bar"></div><div class="bar fourth-bar bar-not-receiving"></div>
                    <!-- Network name-->
                    &nbsp; <span class='network'><span class='carrier'>Verizon</span> &nbsp; <span class='network-type'>LTE</span></span>
                </div>
                <span class='center time'>4:26 PM</span><span class='right battery-power'><i class="battery-icon fa fa-battery-0"></i></span>
            </div>`
        const search = `<div class='_search-container'><i class="material-icons icon">search</i><input type='text' class='search-box-input' placeholder='Search'><i class="material-icons icon mic">mic</i></div>`

        const expander = `
<i class="fa fa-angle-right"></i>`
        const subject = `
<div class="subject">An Update from Best Buy</div>
`
        const emailContentPreview = `
<div class="email-content-preview">Thank you for being a valued customer, View: Web To Our Customers. Across the country...</div>
`
        const messagePreview = `
<!--<div class="mail-message"><hr></div> -->
<div class="unread"></div><span class="from">Best Buy</span><div class="when-and-expander"><span class="when">3:08 AM</span><span class="expander">${expander}</span></div>
${subject}
${emailContentPreview}
<div class="mail-message"><hr></div>
`


        return `
<div class="mail-body app-body">
    <div class="above-content">
        
        <div class="mail-header"><span class="mail-boxes-button"><i class="fa fa-angle-left" aria-hidden="true"></i></span><div class="name">&nbsp;Mailboxes</div><div class="edit-button">Edit</div></div>
        <div class="app-content"> <h1 class="title">Inbox</h1>
        ${search}
    </div>
    </div>
      <div class="message-preview-content">
       ${messagePreview}
      ${messagePreview}
      ${messagePreview}
      ${messagePreview}
     
     ${messagePreview}
      ${messagePreview}
      ${messagePreview}
      ${messagePreview}
      
      ${messagePreview}
      ${messagePreview}
      ${messagePreview}
      ${messagePreview}
      </div>
     
    </div>
     
</div>
`;
    }
}

export default MailAppComponent;