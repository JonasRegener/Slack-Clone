export class User {
    firstName: string;
    lastName: number;
    birthDate: number;
    street: string;
    zipCode: number;
    city: string;
    displayName: string;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.displayName = obj ? obj.displayName : '';
    }
}