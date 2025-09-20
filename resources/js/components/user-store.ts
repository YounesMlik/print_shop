import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

export class User {
    name: string = "";
    address: string = "";
    email?: string = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setName(name: string) {
        this.name = name;
    }

    setAddress(address: string) {
        this.address = address;
    }

    setEmail(email?: string) {
        this.email = email;
    }

    clear() {
        this.name = "";
        this.address = "";
        this.email = undefined;
    }
}

export const userStore = new User();

makePersistable(userStore, {
    name: "UserStore", // key in localStorage
    properties: ["name", "address", "email"],
    storage: window.localStorage,
});