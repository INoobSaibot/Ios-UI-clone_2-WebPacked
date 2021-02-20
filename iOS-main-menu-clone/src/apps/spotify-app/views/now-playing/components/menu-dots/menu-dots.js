import BaseFoo from './base-foo'
import './menu-dots.css'
class MenuDots extends BaseFoo {
    constructor() {
        super();
    }

    render() {
        return`
        <div class="menu-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div>
        <div>
        `
    }


}

customElements.define('menu-dots', MenuDots);
