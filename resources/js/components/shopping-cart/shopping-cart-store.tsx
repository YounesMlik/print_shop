import { makeAutoObservable, computed } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { SetRequired } from 'type-fest';
import is from "@sindresorhus/is";

export class ShoppingCart {
    // persisted
    items: Map<string, CartLine> = new Map();

    constructor(initial?: CartLine[]) {
        makeAutoObservable(this, {
            lines: computed,
            itemCount: computed,
            total: computed,
            isEmpty: computed,
        });

        if (initial) {
            (initial as CartLine[])
                .forEach(({ product, option, quantity }) => {
                    this.add(product, option, quantity)
                })
        };
    }

    // ===== computed =====

    /** lines array for rendering */
    get lines() {
        return this.items.values().toArray();
    }

    get itemCount() {
        return this.lines.reduce((sum, l) => sum + l.quantity, 0);
    }

    get total() {
        return this.lines.reduce((sum, l) => sum + l.total, 0);
    }

    get isEmpty() {
        return this.items.size === 0;
    }

    // ===== actions =====

    add(product: Product, option: SetRequired<Option, "option_attributes">, quantity = 1) {
        if (quantity <= 0) return;
        const key = `${product.id}:${option.id}`;

        const existing = this.items.get(key);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.items.set(key, new CartLine(product, option, quantity))
        }
    }

    setQuantity(pId: Product["id"], oId: Option["id"], quantity: number) {
        const key = `${pId}:${oId}`;
        const line = this.items.get(key);
        if (!line) return;

        if (quantity <= 0) this.items.delete(key);
        else line.quantity = quantity;
    }

    remove(pId: Product["id"], oId: Option["id"]) {
        this.items.delete(`${pId}:${oId}`);
    }

    clear() {
        this.items.clear();
    }
}

export class CartLine {
    product: Product;
    option: SetRequired<Option, "option_attributes">;
    quantity: number;

    constructor(product: Product, option: SetRequired<Option, "option_attributes">, quantity: number) {
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
export const shoppingCart = new ShoppingCart();

// Hook persistence in directly
makePersistable(shoppingCart, {
    name: "cart-v1",
    properties: ["items"],
    storage: window.localStorage,
    stringify: true,
});