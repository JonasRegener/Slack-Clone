export class ChannelEntryContent {
    content!: string;
    postedAt!: string;

    constructor(content: string, date: string) {
        this.content = content;
        this.postedAt = date;
    }
}