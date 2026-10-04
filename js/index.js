function indexOnloadFunc() {
    const homepageItems = homepageGetItems();
    homepageDisplayItems(homepageItems);
}

function homepageGetItems() {
    const homepageItems = [
        {
            title: "Cyberpunk 2077",
            imgSrc: "../img/Cyberpunk_2077.jpg"
        },
        {
            title: "Viewfinder",
            imgSrc: "../img/Viewfinder.jpg"
        },
        {
            title: "Heroes III",
            imgSrc: "../img/Heroes of Might and Magic III.jpg"
        }
    ];

    return homepageItems;
}

function homepageDisplayItems(homepageItems) {
    const homepageItemsDiv = document.getElementById("mostPopularGames");

    homepageItems.forEach(homepageItem => {
        const homepageItem_title = homepageItem.title;
        const homepageItem_imgSrc = homepageItem.imgSrc;

        const homepageItemDivOut = document.createElement("div");
        homepageItemDivOut.className = "homepageItemDivOut";

        const homepageItemDivIn = document.createElement("div");
        homepageItemDivIn.className = "homepageItemDivIn";
        homepageItemDivIn.id = homepageItem.key;

        homepageItemDivIn.innerHTML = `
            <div class="homepageItemHeroImgDiv">
                <img class="homepageItemHeroImg" src="${homepageItem_imgSrc}" alt="${homepageItem_title}-hero">
            </div>
            <div class="homepageItemBelowDiv">
                <h3 class="homepageItemTitle">${homepageItem_title}</h3>
                <div class="homepageItemBtnDiv">
                    <button class="homepage_wishlistBtn" onclick="homepage_wishlistBtnClicked(this)"></button>
                    <button class="homepage_addToCartBtn" onclick="homepage_addToCartBtnClicked(this)"></button>
                </div>
            </div>
        `;

        homepageItemDivOut.appendChild(homepageItemDivIn);
        homepageItemsDiv.appendChild(homepageItemDivOut);
    });
}

function homepage_wishlistBtnClicked(clickedWishlistBtn) {
    const item_title_toWishlist = clickedWishlistBtn.parentElement.previousElementSibling.textContent;
    const item_imgSrc_toWishlist = clickedWishlistBtn.parentElement.parentElement.previousElementSibling.querySelector(".homepageItemHeroImg").src

    const itemData_toWishlist = {
        title: item_title_toWishlist,
        imgSrc: item_imgSrc_toWishlist
    };

    clickedWishlistBtn.textContent = wishlistedItemBtn_textContent;

    wishlistItem(itemData_toWishlist);
}

function homepage_addToCartBtnClicked(clickedAddToCartBtn) {
    const item_title_toAddToCart = clickedAddToCartBtn.parentElement.previousElementSibling.textContent;
    const item_imgSrc_toAddToCart = clickedAddToCartBtn.parentElement.parentElement.previousElementSibling.querySelector(".homepageItemHeroImg").src;

    const item_quantity_toAddToCart = getQuantityAddedToCartItem(item_title_toAddToCart);

    const itemData_toAddToCart = {
        title: item_title_toAddToCart,
        imgSrc: item_imgSrc_toAddToCart,
        quantity: item_quantity_toAddToCart
    };

    console.log(itemData_toAddToCart.imgSrc);

    clickedAddToCartBtn.textContent = AddedToCartItemBtn_textContent;

    addToCartItem(itemData_toAddToCart);
}