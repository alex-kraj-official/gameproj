function indexOnloadFunc() {
    // localStorage.clear();
    const singleGames = [...document.getElementsByClassName('singleGameTitle')];
    set_checkIfInCart_textcontent(singleGames);
    set_checkIfWishlisted_textcontent(singleGames);
}

function homepage_wishlistBtnClicked(clickedWishlistItemBtn) {
    const wishlistedItem = clickedWishlistItemBtn.closest('.singleGameIn');

    const itemWishlisted = {
        title: wishlistedItem.querySelector(".singleGameTitle").textContent,
        img: wishlistedItem.querySelector(".singleGameHeroImg").src
    };

    clickedWishlistItemBtn.textContent = "Wishlisted";

    if (checkItemStatus(itemWishlisted.title, global_localStorageWishlistKeyPrefix)) {
        console.log(`"${itemWishlisted.title}" is already wishlisted!`);
    }
    else {
        wishlistItem(itemWishlisted);
    }
}

function homepage_addToCartBtnClicked(clickedPurchaseBtn) {
    const gamePurchased = clickedPurchaseBtn.closest('.singleGameIn');

    const itemAdded = {
        title: null,
        img: null,
        quantity: 0
    };

    itemAdded.img = gamePurchased.querySelector(".singleGameHeroImg").src;
    itemAdded.title = gamePurchased.querySelector(".singleGameTitle").textContent;

    itemAdded.quantity = getItemQuantityAddedToCart(itemAdded.title);

    clickedPurchaseBtn.textContent = "In Cart";

    if (checkItemStatus(itemAdded.title, global_localStorageCartKeyPrefix)) {
        console.log("This item has been added to the cart already!");
    }
    else {
        console.log("title", itemAdded.title);
        console.log("img", itemAdded.img);
        console.log("quantity", itemAdded.quantity);
    }

    addItemToCart(itemAdded);
}