class Message {
    constructor(id) {
        this.id = id;
        this.elRef = $('#' + id);
        this.expanded = false;
        this.expandButtonElRef = this.elRef.find('.message-expand-button');
        this.hiddenIconsRef = this.elRef.find('.icon-and-name.expanding-row');
        this.init();
    }

    init() {


        this.expandButtonElRef.click(() => {
            this.expandClicked();
        });
        this.expandButtonElRef.on('touchstart', () => {
            this.expandClicked();
        })
    }

    expandClicked() {
        if (this.expanded) {
            this.close()
        } else {
            this.open()
        }
        this.expanded = !this.expanded;
    }

    close() {
        this.expandButtonElRef.removeClass('expanded');
        this.elRef.removeClass('expanded');
        this.hiddenIconsRef.removeClass('expanded')
    }

    open() {
        this.expandButtonElRef.addClass('expanded');
        this.elRef.addClass('expanded')
        this.hiddenIconsRef.addClass('expanded')
    }
}

export default Message;