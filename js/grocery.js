// Exercise 11
// Move this variable to a json file and load the data in this js
var products = [
    {
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery'
    },
    {
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery'
    },
    {
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
var cartList = [];
var cart = [];
var subtotal = {
    grocery: {
        value: 0, 
        discount: 0
    },
    beauty: {
        value: 0, 
        discount: 0
    },
    clothes: {
        value: 0, 
        discount: 0
    },
};
var total = 0;

// Exercise 1
function addToCartList(id) {
    // 1. Loop for to the array products to get the item to add to cart
        products.forEach((product, i) => {
            product.prodId = i+1;    
        })
        function isId(prod) {
            return prod.prodId === id;
          }
        //console.log(products.find(isId));

    // 2. Add found product to the cartList array
        cartList.push(products.find(isId))
        // console.log(cartList);
        // console.log(cartList.type);
        calculateSubtotals();
        calculateTotal();
        applyPromotionsSubtotals();
        generateCart();
}

// Exercise 2
function cleanCart() {
    cartList = []
}

// Exercise 3
function calculateSubtotals() {
    // 1. Create a for loop on the "cartList" array 
        subtotal.grocery.value = 0;
        subtotal.clothes.value = 0;
        subtotal.beauty.value = 0;

     for(i = 0; i < cartList.length; i++){
        // 2. Implement inside the loop an if...else or switch...case to add the quantities of each type of product, obtaining the subtotals: subtotalGrocery, subtotalBeauty and subtotalClothes
        if(cartList[i].type === 'grocery'){
            subtotal.grocery.value += cartList[i].price;
            
            //  console.log("subtotalGrocery", subtotal.grocery.value);

        }else if(cartList[i].type === 'clothes'){
            subtotal.clothes.value += cartList[i].price;

            // console.log("subtotalClothes", subtotal.clothes.value);

        }else if(cartList[i].type === 'beauty'){
            subtotal.beauty.value += cartList[i].price;

            // console.log("subtotalBeauty", subtotal.beauty.value);

        }else{
            return
        }
    }
    // console.log("subtotalGrocery", subtotal.grocery.value);
    // console.log("subtotalClothes", subtotal.clothes.value);
    // console.log("subtotalBeauty", subtotal.beauty.value);

}

// Exercise 4
function calculateTotal() {
    // Calculate total price of the cart either using the "cartList" array
    total = 0;
    for(let productType in subtotal){
        
            total += Object.values(subtotal[productType]).reduce((t, n) => t + n);
            // console.log("productValue: ", subtotal[productType]);

    }
    // console.log("Total: ", total);

}

// Exercise 5
function applyPromotionsSubtotals() {
    subtotal.grocery.discount= 0;
    subtotal.clothes.discount = 0;
    subtotal.beauty.discount = 0;

    let oilProdNum = 0;
    let mixtureProdNum = 0;

    let oilDiscount = 0;
    let mixtureDiscount = 0;
    for(let i = 0; i < cartList.length; i++){
        if(cartList[i].name === 'cooking oil'){
            oilProdNum++;
        }else if(cartList[i].name === 'Instant cupcake mixture'){
            mixtureProdNum++;
        }
    }

    if(oilProdNum >= 4){
        oilDiscount = (products[0].price - 10) * oilProdNum;
    }
    if(mixtureProdNum >= 11){
        mixtureDiscount = (products[2].price - products[2].price * 2/3) * mixtureProdNum;
    }
    // console.log("Oil discount: ", oilDiscount);
    // console.log("Mixture discount: ", mixtureDiscount);

    // Finalment hauràs d'aplicar la rebaixa als subtotales
    subtotal.grocery.value = subtotal.grocery.value - oilDiscount - mixtureDiscount;

    // i tornar a calcular el total (cridant a la funció de l'exercici 4).
    calculateTotal();
}

// Exercise 6
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    let preCart = cartList.map((obj) => obj);

    const cartWithoutReps = {}

    // for(let i = 0; i < preCart.length; i++){
        // cartWithoutReps[preCart[i].quantity] = cartWithoutReps[preCart[i].quantity] == null ? preCart[i].quantity = 1 : preCart[i].quantity += 1;
        // cartWithoutReps[preCart[i].quantity] = cartWithoutReps[preCart[i].quantity] == !null ? preCart[i].quantity += 1 : preCart[i].quantity = 1;

        // preCart[i].push(cartWithoutReps);
        preCart.forEach((elem) => {cartWithoutReps[elem.quantity] = cartWithoutReps[elem.quantity] == null ?  1 : elem.quantity + 1;
        })
    
    // }


    // const found = cart.some(item => cartList.includes(item));
    // let preCart = JSON.parse(JSON.stringify(cartList));
    //  console.log("item", preCart);
    // cart = [];
    // for (let i = 0; i < preCart.length; i++){
        
    //     if(!preCart[i].quantity){
    //         cartList[i].quantity = 1;
    //         preCart = JSON.parse(JSON.stringify(cartList));
    //     }else if(preCart[i].quantity){
    //         cartList[i].quantity += 1;
    //         preCart = JSON.parse(JSON.stringify(cartList));
             cartSet = new Set(preCart);
             cart = [...cartSet]
    //         preCart = []
    //     }
        console.log("cartWithoutReps: ", preCart);

        console.log("Cart: ", cart);
        console.log("CartList: ", cartList);
    

        // if (!found){
        //     preCart[i].quantity = 1;
        //     cart.push(preCart[i]);
        //     console.log("notfound");
        // } else if(found){
        //     let cartQtty = preCart[i].quantity + 1;

        //     console.log("cartQtty",cartQtty);

        //     preCart[i].quantity = cartQtty;  
        //     console.log("found");
        // }
                //  cartList = []
                 

    // }
    // cartSet = new Set(preCart);
    // // console.log("cartSet", cartSet);
    // cart = [...cartSet]

    // cart = cartList
    //  cartList = cart;
    // for (let i = 0; i < cartList.length; i++){
    // for (let prod in cartList){
    //     for( let prod2 in cart){
    //         console.log("prod", prod, prod2);
        //     if(prod !== prod2){
        // return
        // }
    //     if(cartList[i] !== cart){
    //         cartList[i].quantity = 1;
    //         cart.push(cartList[i]);
    //     }else if(cartList[i].id === cart.id){
    //         // cart.find(e => e === cartList[i]).push(e.quantity++)        = cart.filter((x) => {return x === cartList[i]})
    //         cart.quantity++;

    //     }
    // }

}
    

// Exercise 7
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
}

// Exercise 8
function addToCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
}

// Exercise 9
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
}



// Exercise 10
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
}