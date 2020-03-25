class ExampleComponent {
    // static refs = []; /* break firefox and iOS safari*/

    setTitle(title) {
        this.title = title;
        this.render();
    }

    init(container) {
        this.container = container;
        this.title = this.container.dataset.title || '';
        this.render();
    }


    render() {
        this.container.innerHTML = ExampleComponent.markup(this);
        this.container.style.color = 'red';
    }

    static markup({title}) {

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
<div class="mail-message"><hr></div>
<div class="unread"></div><span class="from">Best Buy</span><div class="when-and-expander"><span class="when">3:08 AM</span><span class="expander">${expander}</span></div>
${subject}
${emailContentPreview}
`


        return `<div class="mail-body">${header}
<div class="mail-header"><span class="mail-boxes-button"><i class="fa fa-angle-left" aria-hidden="true"></i></span><div class="name">&nbsp;Mailboxes</div><div class="edit-button">Edit</div></div>
      <div class="app-content"> <h1 class="title">Inbox</h1>
      ${search}
      <div class="message-preview-content">
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

    constructor(container, modalRefs) {
        // The constructor should only contain the boiler plate code for finding or creating the reference.
        if (typeof container.dataset.ref === 'undefined') {
            this.ref = Math.floor(Math.random()); /*cant use static for firefox and safari ios :( */
            modalRefs[this.ref] = this;
            container.dataset.ref = this.ref;
            this.init(container);
        } else {
            // If this element has already been instantiated, use the existing reference.
            return ExampleComponent.refs[container.dataset.ref];
        }
    }
}

export default ExampleComponent;