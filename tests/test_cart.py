import re
from pathlib import Path
from playwright.sync_api import expect
from page_object.cart_page import CartPage
from page_object.index_page import IndexPage


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

    first_cart_item_quantity_added = cart_page.cart_item_quantity_added.first.inner_text()

    if cartItemsAdded != None:
        assert first_cart_item_quantity_added == "Quantity: 2"