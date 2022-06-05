export class Carts {
    constructor(name, price, img, type, id, quantitys = 1) {
        this.name = name,
        this.price = price,
        this.img = img,
        this.type = type,
        this.id = id,
        this.quantitys = quantitys;
    };

    totalPrice() {
        return this.quantitys * this.price;
    };
};
