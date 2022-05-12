export class LoggedInUser {
    userName!: string;
    userPhotoURL!: string;

    constructor(name: string, url: string) {
        this.userName = name;
        this.userPhotoURL = url;
    }
}