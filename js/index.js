import ProductListNew from "../models/productItem.js";
import ProductCart from "../models/productCart.js"


let productList = [];
let productCartMap = [];
let productCarts = [];


let select = document.querySelector("select");
select.addEventListener("change", () => {

    const valueSelect = select.value;
    if (valueSelect === "iphone") {
        return filterProductIphone();
    } else if (valueSelect === "samsung") {
        return filterProductSamsung();
    }
    return fetchProductList();
});

const fetchProductList = async () => {
    try {
        const res = await axios({
            url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
            method: "GET",
        });
        productList = mapProduct(res.data);
        renderProduct(productList);
    } catch (err) {
        console.log(err);
    }
};

const renderProduct = (data) => {
    let productListHTML = "";

    data.forEach((item, index) => {
        productListHTML += item.renderProducts();
    });
    document.getElementById("product").innerHTML = productListHTML;
    addToCart(productList);
    mapProductCart();
};

const mapProduct = (data) => {
    const results = data.map((item) => {
        return new ProductListNew(
            item.name,
            item.price,
            item.img,
            item.type,
            item.id,
            item.quantity,
        );
    }
    );
    console.log(results);
    return results;
};

const filterProductIphone = () => {
    const data = productList;
    const iphone = data.filter((item) => {
        if (item.type === "Iphone") {
            return new ProductListNew(
                item.name,
                item.price,
                item.img,
                item.type,
                item.id,
                item.quantity,
            )
        }

    });
    console.log(iphone);
    renderProduct(iphone);

};
const filterProductSamsung = () => {
    const data = productList;
    const samsung = data.filter((item) => {
        if (item.type === "Samsung") {
            return new ProductListNew(
                item.name,
                item.price,
                item.img,
                item.type,
                item.id,    
                item.quantity,
            )
        }

    });
    console.log(samsung);
    renderProduct(samsung);

};

const findById = (listData, id) => {
    return listData.find((item) => {
      return item.id === id;
    });
  };
  

const addToCart = (id) => {
    const valueButton = document.querySelectorAll("button");
    valueButton.forEach((button, index) => {
        button.addEventListener("click", (event) => {

            let btnItem = event.target;
            let product = btnItem.parentElement;
            let productId = product.querySelector("button").value;
            
            addCart(productId);
            
        })
    })
    document.getElementById("Cart").style.display = "block";
};

const addCart = (productId) => {
    let data = productCartMap;
    data.find((item) => {
        if (item.id === productId) {
            increaseToCart(productId);
            
            return true;
        }
        return false;
    }) ||
    productCartMap.find((item) => {
        if (item.id === id) {
         mapProductCart(productCartMap);
         //productCarts.push(item);
        //   console.log(productCarts)
         // saveData();
          renderCarts();
          
          return true;
        }
        return false;
      })
      
};

const renderCarts = () => {
    let cartHTML = "";
    let sumPrice = 0;
    productCartMap.map((item) => {
        sumPrice += item.totalPrice();
        cartHTML += item.renderCart();
    });
    document.getElementById("tbodyCart").innerHTML = cartHTML;
};

const mapProductCart = () => {
    productList.map((currentItem) => {
        let productCartMaped = new ProductCart(
            currentItem.name,
            currentItem.price,
            currentItem.img,
            currentItem.type,
            currentItem.id,
            currentItem.quantitys,
        )
        productCartMap.push(productCartMaped);
    })
    
    return productCartMap;
};

const increaseToCart = (productId) => {
    let totalQuantity = findById(productList, productId)
    let itemCart = productCartMap.find((currentItem) => {
        return currentItem.id === productId;
    })
    
    if (itemCart && itemCart.quantitys < totalQuantity.quantity) {
        itemCart.quantitys++;
        //saveData();
        renderCarts();
      }
};

const decreaseToCart = (productId) => {

    let itemCart = productCartMap.find((currentItem) => {
      return currentItem.id === productId;
    });
    console.log(itemCart)
    if (itemCart && itemCart.quantitys > 0) {
      itemCart.quantitys--;
      //saveData();
      renderCarts();
    }
  };

const handleDeleteItem = (productId) => {
    const isConfirm = confirm("Bạn có chắc chắn muốn xóa khỏi giỏ hàng!");
    if (isConfirm) {
      const index = productCartMap.findIndex((currentItem) => {
        return currentItem.id === productId; 
      });
      productCartMap.splice(index, 1);
      //saveData();
      renderCarts();

    } else return;
};


fetchProductList();

