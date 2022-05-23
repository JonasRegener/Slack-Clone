export class MessageForm {
    sentByUID!: string;
    receiverUID!: string;
    message!: string;
    date!: number;
    reaction: string = '';
    replies = [];

    constructor(sentByUID: string, receiverUID: string, message: string, date: number,) {
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