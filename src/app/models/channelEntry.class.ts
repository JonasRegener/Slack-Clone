export class ChannelEntry {
    userName!: string;
    userPhotoURL!: string;
    content!: string;
    postedAt!: number;
    reactions: string = '';
    comments = [];

    constructor(obj1: any, obj2: any) {
        this.userName = obj1.userName;
        this.userPhotoURL = obj1.userPhotoURL;
        this.content = obj2.content;
        this.postedAt = obj2.postedAt;
    }

    toJSON() {
        return {
            userName: this.userName,
            userPhotoURL: this.userPhotoURL,
            content: this.content,
            postedAt: this.postedAt,
            reactions: this.reactions,
            comments: this.comments
        }
    }
}