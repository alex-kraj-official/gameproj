import re
from playwright.sync_api import expect

# page, index_url: pytest automatically gets them:
# page: an opened browser tab, ready to use
# index_url: comes from conftest.py: the "file:///...index.html"
# index_url must be the same as the function name in conftest.py!
def test_homepage_site_loadable(page, index_url):
    # go to this url. Playwright waits the url to completely load before move on to the next command.
    page.goto(index_url)
    # expect waits and retries for deafult 5 sec. to complete the condition (auto-waiting)
    expect(page).to_have_title("G33X")


def test_homepage_all_3_videogames_appearing_on_homepage(page, index_url):
    page.goto(index_url)

    games = page.locator(".homepageItemTitle")

    expect(games).to_have_count(3)


def test_homepage_wishlistBtns_textContent_default(page, index_url):
    page.goto(index_url)

    wishlistBtns = page.locator(".homepage_wishlistBtn")
    count = wishlistBtns.count()

    expect(wishlistBtns).to_have_text(["Wishlist"] * count)


def test_homepage_addToCartBtns_textContent_default(page, index_url):
    page.goto(index_url)

    addToCartBtns = page.locator(".homepage_addToCartBtn")
    count = addToCartBtns.count()

    expect(addToCartBtns).to_have_text(["Add to Cart"] * count)


def test_homepage_first_wishlistBtn_click_changes_textContent(page, index_url):
    page.goto(index_url)

    first_btn = page.locator(".homepage_wishlistBtn").first

    first_btn.click()

    expect(first_btn).to_have_text("On Wishlist")


def test_homepage_all_wishlistBtns_click_changes_textContents(page, index_url):
    page.goto(index_url)

    wishlistBtns = page.locator(".homepage_wishlistBtn")
    count = wishlistBtns.count()

    # nth(i): the i-th result, numbering from 0
    for i in range(count):
        wishlistBtns.nth(i).click()

    expect(wishlistBtns).to_have_text(["On Wishlist"] * count)

def test_homepage_first_addToCartBtn_click_changes_textContent(page, index_url):
    page.goto(index_url)

    addToCartBtn = page.locator(".homepage_addToCartBtn").first

    addToCartBtn.click()

    expect(addToCartBtn).to_have_text("In Cart")

def test_homepage_addToCartBtns_click_changes_textContents(page, index_url):
    page.goto(index_url)

    addToCartBtns = page.locator(".homepage_addToCartBtn")
    count = addToCartBtns.count()

    for i in range(count):
        addToCartBtns.nth(i).click()

    expect(addToCartBtns).to_have_text(["In Cart"] * count)

def test_homepage_all_items_have_img(page, index_url):
    page.goto(index_url)

    imgs = page.locator(".homepageItemHeroImg")
    count = imgs.count()
    
    assert count > 0, "No matching image elements found on the page."

    for i in range(count):
        # re.compile(r".+"):
        # Ensures the src attribute exists and
        # contains at least one character
        # (meaning it isn't blank or completely empty).
        expect(imgs.nth(i)).to_have_attribute("src", re.compile(r".+"))