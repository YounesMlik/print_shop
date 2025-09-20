import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

export class User {
    name: string = "";
    address: string = "";
    email?: string = undefined;

    constructor() {
        makeAutoObservable(this);
    }
}

export const userStore = new User();

makePersistable(userStore, {
    name: "UserStore", // key in localStorage
    properties: ["name", "address", "email"],
    storage: window.localStorage,
});