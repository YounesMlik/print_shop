import { makeAutoObservable, computed } from "mobx";
import { makePersistable } from "mobx-persist-store";

export class ShoppingCartStore {
    // persisted
    items: Record<string, CartLine> = {};

    constructor() {
        makeAutoObservable(this, {
            lines: computed,
            itemCount: computed,
            total: computed,
            isEmpty: computed,
        });

        makePersistable(this, {
            name: "cart-v1",
            properties: ["items"],
            storage: window.localStorage,
            stringify: true,
        });
    }

    // ===== computed =====

    /** lines array for rendering */
    get lines() {
        return Object.values(this.items);
    }

    get itemCount() {
        return this.lines.reduce((sum, l) => sum + l.quantity, 0);
    }

    get total() {
        return this.lines.reduce((sum, l) => sum + l.total, 0);
    }

    get isEmpty() {
        return this.lines.length === 0;
    }

    // ===== actions =====

    add(product: Product, option: Option, quantity = 1) {
        if (quantity <= 0) return;
        const key = `${product.id}:${option.id}`;

        const existing = this.items[key];
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.items[key] = new CartLine(product, option, quantity);
        }
    }

    setQuantity(pId: Product["id"], oId: Option["id"], quantity: number) {
        const key = `${pId}:${oId}`;
        const line = this.items[key];
        if (!line) return;

        if (quantity <= 0) delete this.items[key];
        else line.quantity = quantity;
    }

    remove(pId: Product["id"], oId: Option["id"]) {
        delete this.items[`${pId}:${oId}`];
    }

    clear() {
        this.items = {};
    }
}

export class CartLine {
    product: Product;
    option: Option;
    quantity: number;

    constructor(product: Product, option: Option, quantity: number) {
        this.product = { ...product }; // snapshot
        this.option = { ...option };   // snapshot
        this.quantity = quantity;

        makeAutoObservable(this);
    }

    /** derived: stable key for dict + UI */
    get key() {
        return `${this.product.id}:${this.option.id}`;
    }

    /** derived: subtotal for this line */
    get total() {
        return this.option.price * this.quantity;
    }
}


// singleton
export const shoppingCart = new ShoppingCartStore();
