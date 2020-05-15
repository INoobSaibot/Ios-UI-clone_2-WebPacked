class Clock {
    constructor(name, callBack) {
        // this.clockname = name;
        // this.callBack = callBack
        this.init()
    }

    init() {
        setInterval(this.renderTime, 1000);
    }

    renderTime() {
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        const am_pm = h > 12 ? 'PM' : 'AM';
        h = h > 12 ? h - 12 : h;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;

        // const formatted = h + ":" + m + ":" + s + ' ' + am_pm;
        const formatted = h + ":" + m + ' ' + am_pm;
        const jq = $('.time');
        [jq].forEach(el => el.html(formatted));

        // if (this.callBack){
        //     this.callBack(formatted)
        // }
    }
}

export default Clock;