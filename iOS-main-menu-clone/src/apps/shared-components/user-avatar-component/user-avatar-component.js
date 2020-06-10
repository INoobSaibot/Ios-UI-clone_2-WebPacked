import './user-avatar-component.css';

class UserAvatarComponent extends HTMLElement {
    connectedCallback() {
        const initials = this.getAttribute('initials') || '??';
        this.innerHTML = `<span>${initials}</span>`;
    }
}

customElements.define('user-avatar', UserAvatarComponent);