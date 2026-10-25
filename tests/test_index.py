import re
from playwright.sync_api import expect
from page_object.index_page import IndexPage

N_O_GAMES_ON_HOMEPAGE = 3


def test_homepage_shows_expected_number_of_games(page, index_url):
    index_page = IndexPage(page, index_url)
    index_page.open()

    expect(index_page.game_titles).to_have_count(N_O_GAMES_ON_HOMEPAGE)
    expect(index_page.game_imgs).to_have_count(N_O_GAMES_ON_HOMEPAGE)


def test_homepage_game_titles_are_not_empty(page, index_url):
    index_page = IndexPage(page, index_url)
    index_page.open()

    for title in index_page.game_titles.all():
        expect(title).not_to_be_empty()


def test_homepage_game_images_have_valid_src(page, index_url):
    index_page = IndexPage(page, index_url)
    index_page.open()

    for i in range(index_page.game_imgs.count()):
        expect(index_page.game_imgs.nth(i)).to_have_attribute(
            "src", re.compile(r"\.(png|jpg|webp)$")
        )


def test_homepage_game_images_load(page, index_url):
    index_page = IndexPage(page, index_url)
    index_page.open()

    for i in range(index_page.game_imgs.count()):
        natural_width = index_page.get_img_natural_width(i)
        assert natural_width > 0, f"Image number {i} did not load (broken src)."
