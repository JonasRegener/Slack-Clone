export class Message {
    sentByUID!: string;
    receiverUID!: string;
    message!: string;
    date!: string;
    reaction: string = '';
    replies = [];

    constructor(sentByUID: string, receiverUID: string, message: string, date: string,) {
        this.sentByUID = sentByUID;
        this.receiverUID = receiverUID;
        this.message = message;
        this.date = date;
    }

    toJSON() {
        return {
            sentByUID: this.sentByUID,
            receiverUID: this.receiverUID,
            message: this.message,
            date: this.date,
            reaction: this.reaction,
            replies: this.replies
        }
    }
}