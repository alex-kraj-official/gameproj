function indexOnloadFunc() {
    // localStorage.clear();
    const singleGames = [...document.getElementsByClassName('singleGameTitle')];
    checkIfInCart(singleGames);
    checkIfWishlisted(singleGames);
}

function checkIfInCart(singleGames) {
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

function checkIfWishlisted(singleGames) {
    singleGames.forEach(singleGame => {
        const wishlistBtn = singleGame.nextElementSibling.querySelector('.wishlistBtn');
        if (checkIfItemWishlisted(singleGame.textContent)) {
            if (wishlistBtn) {
                wishlistBtn.textContent = "Wishlisted";
            }
        }
        else {
            if (wishlistBtn) {
                wishlistBtn.textContent = "Wishlist";
            }
        }
    });
}

function checkIfItemAddedToCart(itemAdded) {
    let storageKey = "cart-" + itemAdded;
    if (localStorage.getItem(storageKey) != null) {
        return true;
    }
    else {
        return false;
    }
}

function checkIfItemWishlisted(itemAdded) {
    let storageKey = "wishlist-" + itemAdded;
    if (localStorage.getItem(storageKey) != null) {
        return true;
    }
    else {
        return false;
    }
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
    let storageKey = "cart-" + itemAdded.title;
    localStorage.setItem(storageKey, JSON.stringify(itemAdded));
    console.log(`"${itemAdded.title}" is already added to cart!`);
}

function getPurchasedGameQuantity(itemAdded) {
    let storageKey = "cart-" + itemAdded.title;
    if (localStorage.getItem(storageKey) != null) {
        let itemAddedCurrentQuantity = JSON.parse(localStorage.getItem(storageKey)).quantity;
        return itemAddedCurrentQuantity + 1;
    } else {
        return 1;
    }
}

function wishlistBtnClicked(clickedWishlistItemBtn) {
    const wishlistedItem = clickedWishlistItemBtn.closest('.singleGameIn');

    const itemWishlisted = {
        title: wishlistedItem.querySelector(".singleGameTitle").textContent,
        img: wishlistedItem.querySelector(".singleGameHeroImg").src
    };

    clickedWishlistItemBtn.textContent = "Wishlisted";

    if (checkIfItemWishlisted(itemWishlisted.title)) {
        console.log(`"${itemWishlisted.title}" is already wishlisted!`);
    }
    else {
        wishlistItem(itemWishlisted);
    }
}

function wishlistItem(clickedWishlistItemBtn) {
    let storageKey = "wishlist-" + clickedWishlistItemBtn.title;
    localStorage.setItem(storageKey, JSON.stringify(clickedWishlistItemBtn));
    console.log(`"${clickedWishlistItemBtn.title}" wishlisted!`)
}