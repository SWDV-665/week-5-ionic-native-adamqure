export class Grocery {
    name: string;
    price: number;
    count: number;

    constructor(name: string, price: number, count: number) {
        this.name = name
        this.price = price
        this.count = count
    }

    getSubtotal(): number {
        return this.price * this.count;
    }

    toString(): string {
        return this.name + " (" + this.count + ") -- $" + this.getSubtotal() 
    }
}