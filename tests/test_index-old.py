from playwright.sync_api import expect
import re

# page, index_url variables explanation:
# page: the currently opened browser tab (pytest automatically gets it)
# index_url: comes from conftest.py: the "file:///...index.html"


def test_homepage_site_loadable_and_correct_pageTitle(page, index_url):
    # Go to this url. Playwright waits the url to completely load before move on to the next command.
    page.goto(index_url)
    # "Expect" waits and retries for deafult 5 sec. to complete the condition (auto-waiting)
    expect(page).to_have_title("G33X")


def test_homepage_all_game_appeares_on_homepage_correctly(page, index_url):
    page.goto(index_url)

    N_o_GamesOnHomepage = 3

    gameTitles = page.locator(".homepageItemTitle")
    gameImgs = page.locator(".homepageItemHeroImg")

    # Test No. gameTitles and gameImgs found on homepage
    expect(gameTitles).to_have_count(N_o_GamesOnHomepage)
    expect(gameImgs).to_have_count(N_o_GamesOnHomepage)

    # Test gameTitles
    for title in gameTitles.all():
        # This asserts the element has text content and it is not an empty string ""
        expect(title).not_to_be_empty()

    # Test imgSrcs
    for i in range(N_o_GamesOnHomepage):
        img = gameImgs.nth(i)

        # Check 1: the src attribute exists and is not an empty string
        expect(img).to_have_attribute("src", re.compile(r".+"))
        # expect(img).to_have_attribute("src", re.compile(r"\.png$"))

        # Check 2: the image really loaded in the browser
        # naturalWidth (the loaded img width in the browser)
        # is 0 if the img file is missing or broken
        # naturalWidth is a built-in js view html attr. (prop.)
        natural_width = img.evaluate("element => element.naturalWidth")
        assert natural_width > 0, f"Image number {i} did not load (broken src)."


def test_homepage_all_wishlistBtns_textContent_Correctdefault(page, index_url):
    page.goto(index_url)

    wishlistBtns = page.locator(".homepage_wishlistBtn")
    count = wishlistBtns.count()

    expect(wishlistBtns).to_have_text(["Wishlist"] * count)


def test_homepage_all_addToCartBtns_textContent_Correctdefault(page, index_url):
    page.goto(index_url)

    addToCartBtns = page.locator(".homepage_addToCartBtn")
    count = addToCartBtns.count()

    expect(addToCartBtns).to_have_text(["Add to Cart"] * count)


def test_homepage_all_wishlistBtns_onclick_changes_textContent(page, index_url):
    page.goto(index_url)

    wishlistBtns = page.locator(".homepage_wishlistBtn")
    count = wishlistBtns.count()

    # nth(i): the i-th result, numbering from 0
    for i in range(count):
        wishlistBtns.nth(i).click()

    expect(wishlistBtns).to_have_text(["On Wishlist"] * count)


def test_homepage_all_addToCartBtns_onclick_changes_textContent(page, index_url):
    page.goto(index_url)

    addToCartBtns = page.locator(".homepage_addToCartBtn")
    count = addToCartBtns.count()

    for i in range(count):
        addToCartBtns.nth(i).click()

    expect(addToCartBtns).to_have_text(["In Cart"] * count)
