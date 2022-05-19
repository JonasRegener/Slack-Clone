export class ChannelEntryContent {
    content!: string;
    postedAt!: number;

    constructor(content: string, date: number) {
        this.content = content;
        this.postedAt = date;
    }
}