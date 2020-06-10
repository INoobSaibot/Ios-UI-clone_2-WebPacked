import './settings-option-component.css';

class SettingsOptionComponent extends HTMLElement {
    connectedCallback() {
        // const height = this.getAttribute('height') || '33rem';
        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML = `
<div>
    <slot name="settingTitle"></slot>
</div>`;
    }
}

customElements.define('settings-option', SettingsOptionComponent);