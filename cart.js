function indexOnloadFunc() {
    // localStorage.clear();
}

function cartOnLoadFunc() {
    const cartItemsAdded = cartGetAddedItems()
    console.log(cartItemsAdded)

    cartDisplayAddedItems(cartItemsAdded)
}

function cartGetAddedItems() {
    const allItems = Object.keys(localStorage).map(key => ({
        key: key,
        value: localStorage.getItem(key)
    }));
    return allItems
}

function cartDisplayAddedItems(cartItemsAdded) {
    const cartItems = document.getElementById("cartItems");

    cartItemsAdded.forEach(cartItemAdded => {
        let div = document.createElement("div")
        div.className = "singleGame"
        div.id = cartItemAdded.key
        div.innerHTML = `
            <img class="singleGameHero" src="${JSON.parse(cartItemAdded.value).img}" alt="Cyberpunk_2077-hero">
            <h3>${JSON.parse(cartItemAdded.value).title}</h3>
            <h4 class="addedQuantity">Quantity: ${JSON.parse(cartItemAdded.value).quantity}</h4>
            <div class="addToWishListBtnInCart">
                <button class="addToWishListBtn">Wishlist</button>
            </div>
        `
        cartItems.appendChild(div)
    });
}

function addToCartBtnClicked(clickedPurchaseBtn) {
    const gamePurchased = clickedPurchaseBtn.parentElement;

    const itemAdded = {
        title: null,
        img: null,
        quantity: 0
    }

    itemAdded.img = gamePurchased.querySelector(".singleGameHero").src;
    itemAdded.title = gamePurchased.querySelector("h3").textContent;

    itemAdded.quantity = getPurchasedGameQuantity(itemAdded)

    console.log("title", itemAdded.title);
    console.log("img", itemAdded.img);
    console.log("quantity", itemAdded.quantity);

    addItemToCart(itemAdded)
}

function addItemToCart(itemAdded) {
    localStorage.setItem(itemAdded.title, JSON.stringify(itemAdded))

    console.log(`\"${JSON.parse(localStorage.getItem(itemAdded.title)).title}\" added to cart!`)
}

function getPurchasedGameQuantity(itemAdded) {
    if (localStorage.getItem(itemAdded.title) != null) {
        let itemAddedCurrentQuantity = (JSON.parse(localStorage.getItem(itemAdded.title))).quantity
        return itemAddedCurrentQuantity += 1
    }
    else { return 1 }
}