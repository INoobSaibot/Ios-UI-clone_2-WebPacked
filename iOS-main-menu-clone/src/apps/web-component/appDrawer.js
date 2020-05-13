let tmpl = document.createElement('template');
tmpl.innerHTML = `
  <style>:host { ... }</style> <!-- look ma, scoped styles -->
  <b>I'm in shadow dom!</b>
  <slot></slot>
`;


class AppDrawer extends HTMLElement {

    get open() {
        return this.hasAttribute('open');
    }

    set open(val) {
        if (val) {
            this.setAttribute('open', '')
        } else {
            this.removeAttribute('open');
        }
        this.toggleDrawer();
    }

    get disabled(){
        return this.hasAttribute('disabled');
    }

    set disabled(val) {
        // Reflect the value of the disabled property as an HTML attribute.
        if (val) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }


    // Can define constructor arguments if you wish.
    constructor() {
        // If you define a constructor, always call super() first!
        // This is specific to CE and required by the spec.
        super();

        // Attach a shadow root to the element.
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(tmpl.content.cloneNode(true));

        // Setup a click listener on <app-drawer> itself.
        this.addEventListener('click', e => {
            // Don't toggle the drawer if it's disabled.
            if (this.disabled) {
                return;
            }
            this.toggleDrawer();
        });
    }

    toggleDrawer(){
        if(this.toggles = 1){
            this.toggles = 0
        } else {
            this.toggles = 1
        }
        console.log(this.toggles)
    }

    connectedCallback(){
        alert('connectedCallback()')
        this.innerHTML = `<div>foo</div>`
    }

    disconnectedCallback(){
        alert('disconnectedCallback()')
    }

    attributeChangedCallback(attrName, oldVal, newVal){
        console.log('attributeChangedCallback()' , attrName, oldVal, newVal)
    }

}

window.customElements.define('app-drawer', AppDrawer);