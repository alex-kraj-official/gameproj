function indexOnloadFunc() {
    // set_checkIfInCart_textcontent(homepage_allGamesTitle);
    // set_checkIfWishlisted_textcontent(homepage_allGamesTitle);
}

function homepage_wishlistBtnClicked(clickedWishlistItemBtn) {
    const wishlistedItem = clickedWishlistItemBtn.closest('.homepageItemDivIn');

    const itemWishlisted = {
        title: wishlistedItem.querySelector(".homepageItemTitle").textContent,
        img: wishlistedItem.querySelector(".homepageItemHeroImg").src
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
    const gamePurchased = clickedPurchaseBtn.closest('.homepageItemDivIn');

    const itemAdded = {
        title: null,
        img: null,
        quantity: 0
    };

    itemAdded.img = gamePurchased.querySelector(".homepageItemHeroImg").src;
    itemAdded.title = gamePurchased.querySelector(".homepageItemTitle").textContent;

    itemAdded.quantity = getQuantityAddedToCartItem(itemAdded.title);

    clickedPurchaseBtn.textContent = "In Cart";

    if (checkItemStatus(itemAdded.title, global_localStorageCartKeyPrefix)) {
        console.log("This item has been added to the cart already!");
    }
    else {
        console.log("title", itemAdded.title);
        console.log("img", itemAdded.img);
        console.log("quantity", itemAdded.quantity);
    }

    addToCartItem(itemAdded);
}