import { Carts } from "./Carts.js";

class ProductCart extends Carts {
    constructor(name, price, img, type, id, quantitys) {
        super(name, price, img, type, id, quantitys);
    };
    renderCart() {
        return `
            <tr>
                <td>
                    <img
                    src="${this.img}"
                    alt=""
                    width="70px"
                    height="70px"
                    />
                </td>
                <td>${this.name}</td>

                <td>${this.price} VND</td>
                <td>
                    <button class="btn btn-warning me-1" onclick="decrease('${this.id}')"
                    >-</button>${this.quantitys}
                    <button class="btn btn-warning ms-1" onclick="increase('${this.id}')"
                    >+</button>
                </td>
                <td>${this.totalPrice()} VND</td>
                <td>
                    <button
                    className="btn btn-danger"
                    onclick="handleDeleteItem('${this.id}')"
                    id = "handelDetlete"
                    }
                    >
                    Xoá
                    </button>
                </td>
            </tr>        
        `;
    };
};
export default ProductCart;
