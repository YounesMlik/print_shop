import { makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { Writable, WritableKeysOf } from "type-fest";

export class User {
    name: string = "";
    address: string = "";
    email?: string = undefined;

    set<T extends object, K extends WritableKeysOf<T>>(key: K, value: T[K]) {
        (this as any)[key] = value;
    }

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