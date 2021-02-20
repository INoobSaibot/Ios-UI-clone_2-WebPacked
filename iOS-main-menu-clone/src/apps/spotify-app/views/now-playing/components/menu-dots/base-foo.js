
class BaseFoo extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback() {
        setTimeout(()=>{
            this.innerHTML = this.render()
        })
    }

    render(){
        console.error('your derived class must implement render, which should return and html template to render')
    }

    somethingChanged(){
        setTimeout(()=>{
            this.innerHTML = this.render()
        })
    }
}

export default BaseFoo;

