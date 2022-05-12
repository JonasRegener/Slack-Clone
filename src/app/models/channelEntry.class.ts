export class ChannelEntry {
    name!: string;
    customIdName!: string;
    content!: string;
    postedAt!: string;
    reactions!: string;
    user = {};

    constructor(obj: any) {
        this.name = obj.name;
    }
}