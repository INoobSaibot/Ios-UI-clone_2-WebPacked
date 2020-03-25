import Message from "./message";

class MessageCenterService {
    constructor(messagesArr) {
        this.messages = messagesArr;
        this.components = [];
        this.init();
    }

    init() {
        this.messages.forEach((message) => {
            this.components.push(new Message(message));
        })
    }
}

export default MessageCenterService;