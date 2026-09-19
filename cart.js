function indexOnloadFunc() {
    // localStorage.clear();
}

function cartOnLoadFunc() {
    const cartItemsAdded = cartGetAddedItems();
    console.log(cartItemsAdded);

    cartDisplayAddedItems(cartItemsAdded);
}

function cartGetAddedItems() {
    // Using a prefix filter so Cart and Wishlist don't mix up in localStorage
    const allItems = Object.keys(localStorage)
        .filter(key => key.startsWith("cart_"))
        .map(key => ({
            key: key,
            value: localStorage.getItem(key)
        }));
    return allItems;
}

function cartDisplayAddedItems(cartItemsAdded) {
    const cartItems = document.getElementById("cartItems");

    cartItemsAdded.forEach(cartItemAdded => {
        let itemData = JSON.parse(cartItemAdded.value);

        let divOut = document.createElement("div");
        divOut.className = "singleGameOut";

        let divIn = document.createElement("div");
        divIn.className = "singleGameIn";
        divIn.id = cartItemAdded.key;
        
        divIn.innerHTML = `
            <div class="cartItemDataDiv">
                <img class="singleGameHeroImg" src="${itemData.img}" alt="${itemData.title}-hero">
                <div class="cartItemText">
                    <h3 class="singleGameTitle">${itemData.title}</h3>
                    <h4 class="addedQuantity">Quantity: ${itemData.quantity}</h4>
                </div>
            </div>
            <div class="addToWishListBtnInCart">
                <button class="addToWishListBtn">Wishlist</button>
            </div>
        `;

        divOut.appendChild(divIn);
        cartItems.appendChild(divOut);
    });
}

function addToCartBtnClicked(clickedPurchaseBtn) {
    const gamePurchased = clickedPurchaseBtn.closest('.singleGameIn');

    const itemAdded = {
        title: null,
        img: null,
        quantity: 0
    };

    itemAdded.img = gamePurchased.querySelector(".singleGameHeroImg").src;
    itemAdded.title = gamePurchased.querySelector(".singleGameTitle").textContent;

    itemAdded.quantity = getPurchasedGameQuantity(itemAdded);

    console.log("title", itemAdded.title);
    console.log("img", itemAdded.img);
    console.log("quantity", itemAdded.quantity);

    addItemToCart(itemAdded);
}

function addItemToCart(itemAdded) {
    // "cart_" prefix to prevent conflicts with wishlist items
    let storageKey = "cart_" + itemAdded.title;
    localStorage.setItem(storageKey, JSON.stringify(itemAdded));
    console.log(`"${itemAdded.title}" added to cart!`);
}

function getPurchasedGameQuantity(itemAdded) {
    let storageKey = "cart_" + itemAdded.title;
    if (localStorage.getItem(storageKey) != null) {
        let itemAddedCurrentQuantity = JSON.parse(localStorage.getItem(storageKey)).quantity;
        return itemAddedCurrentQuantity + 1;
    } else {
        return 1;
    }
}