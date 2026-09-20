function indexOnloadFunc() {
    // localStorage.clear();
    const singleGames = [...document.getElementsByClassName('singleGameTitle')];
    singleGames.forEach(singleGame => {
        const purchaseBtn = singleGame.nextElementSibling.querySelector('.purchaseBtn');
        if (checkIfItemAddedToCart(singleGame.textContent)) {
            if (purchaseBtn) {
                purchaseBtn.textContent = "In Cart";
            }
        }
        else {
            if (purchaseBtn) {
                purchaseBtn.textContent = "Add to Cart";
            }
        }
    });
}

function cartOnLoadFunc() {
    console.log('cartLoading');
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
            <div class="cartItemBtnDiv">
                <button class="addToWishListBtn">Wishlist</button>
                <button class="removeFromCartBtn" onclick="removeCartItem(this)">Remove</button>
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

    clickedPurchaseBtn.textContent = "In Cart";

    if (checkIfItemAddedToCart(itemAdded.title)) {
        console.log("This item has been added to the cart already!");
        addItemToCart(itemAdded);
    }
    else {

        console.log("title", itemAdded.title);
        console.log("img", itemAdded.img);
        console.log("quantity", itemAdded.quantity);

        addItemToCart(itemAdded);
    }
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

function checkIfItemAddedToCart(itemAdded) {
    let storageKey = "cart_" + itemAdded;
    if (localStorage.getItem(storageKey) != null) {
        return true;
    }
    else {
        return false;
    }
}

function removeCartItem(itemToRemove) {
    const itemTitleToRemove = itemToRemove.parentElement.previousElementSibling.querySelector('.singleGameTitle').textContent;
    localStorage.removeItem('cart_' + itemTitleToRemove);
    // window.location.reload();

    const fullItemToRemove = itemToRemove.parentElement.parentElement.parentElement
    fullItemToRemove.remove();
}