import { setter } from "@/components/helpers";
import { makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";


class User {
    name: string = "";
    address: string = "";
    email?: string = undefined;

    readonly set = setter<this>;

    constructor() {
        makeAutoObservable(this);
    }
}

export { User };
export const userStore = new User();

makePersistable(userStore, {
    name: "UserStore", // key in localStorage
    properties: ["name", "address", "email"],
    storage: window.localStorage,
});