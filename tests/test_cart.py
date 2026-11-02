import re
from pathlib import Path
from playwright.sync_api import expect
from page_object.cart_page import CartPage
from page_object.index_page import IndexPage
from page_object.wishlist_page import WishlistPage


def test_cartItems_loaded(page, index_url, cart_url):
    index_page = IndexPage(page, index_url)
    index_page.open()

    first_addToCartBtn = index_page.addToCartBtns.first

    first_addToCartBtn.click()

    cart_page = CartPage(page, cart_url)
    cart_page.open()

    cart_js_dir = Path(__file__).resolve().parent
    cart_js_path = cart_js_dir.parent / "app" / "js" / "cart.js"

    with open(cart_js_path, "r", encoding="utf-8") as f:
        cart_js = f.read()

    cartItemsAdded = page.evaluate(
        f"() => {{ {cart_js}; return cartGetAddedItems(); }}"
    )

    if cartItemsAdded != None:
        # assert(len(cartItemsAdded)) == cart_page.cart_item_titles.count()
        assert(len(cartItemsAdded)) == 1


def test_cartItems_correct_quantity(page, index_url, cart_url):
    index_page = IndexPage(page, index_url)
    index_page.open()

    first_addToCartBtn = index_page.addToCartBtns.first
    [first_addToCartBtn.click() for _ in range(2)]

    cart_page = CartPage(page, cart_url)
    cart_page.open()

    cart_js_dir = Path(__file__).resolve().parent
    cart_js_path = cart_js_dir.parent / "app" / "js" / "cart.js"

    with open(cart_js_path, "r", encoding="utf-8") as f:
        cart_js = f.read()

    cartItemsAdded = page.evaluate(
        f"() => {{ {cart_js}; return cartGetAddedItems(); }}"
    )

    first_cart_item_quantity_added = cart_page.cartItem_quantities_added.first.inner_text()

    if cartItemsAdded != None:
        assert first_cart_item_quantity_added == "Quantity: 2"

def test_cartItem_wishlistBtn_wishlisted(page, index_url, cart_url, wishlist_url):
    index_page = IndexPage(page, index_url)
    index_page.open()

    first_addToCartBtn = index_page.addToCartBtns.first

    first_addToCartBtn.click()

    cart_page = CartPage(page, cart_url)
    cart_page.open()

    first_cartItem_wishlistBtn = cart_page.cartItem_wishlistBtns.first
    first_cartItem_title = cart_page.cartItem_titles.first
    first_cartItem_title_textContent = first_cartItem_title.text_content()

    first_cartItem_wishlistBtn.click()

    expect(first_cartItem_wishlistBtn).to_have_text("On Wishlist")

    wishlist_page = WishlistPage(page, wishlist_url)
    wishlist_page.open()

    matching_titles = wishlist_page.wishlistItem_titles.filter(
        has_text=first_cartItem_title_textContent
    )

    expect(matching_titles.first).to_be_visible()
