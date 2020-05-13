
const smallIcon = function (title, iconName, iconColor) {
const iconClass = iconName || '';
    const multiAppViewIcon = `
<div class="multiAppViewIcon">
    <span class="app-icon ${iconClass}"></span><span class="title">${title}</span>
</div>
`
    const iconElement = document.createElement('div')
    iconElement.innerHTML = multiAppViewIcon;

    return  iconElement;
}

export default smallIcon;