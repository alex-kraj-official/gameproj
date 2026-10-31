# Game Project

A small videogame storefront/tracker project built as a learning project while developing frontend and software testing skills.

The project started as a simple HTML/CSS/JavaScript videogame store and is gradually evolving into a testable web application. The long-term goal is to add a backend/API and persistent user data.

## Current features

- Homepage displaying videogames
- Add games to cart
- Cart state persisted with `localStorage`
- Remove games from the cart without reloading the page
- Wishlist functionality
- Add/remove games from the wishlist
- Add wishlisted games to the cart
- Separate JavaScript modules for the main pages/features

## Testing

The project currently uses:

- Python
- pytest
- Playwright
- pytest-playwright
- Page Object Model (POM)
- End-to-end (E2E) testing

Current automated tests cover areas such as:

- Expected number of games displayed on the homepage
- Game titles not being empty
- Image `src` attributes having expected file extensions
- Images actually loading in the browser
- Adding a game to the cart and verifying it appears in the cart

The tests are being developed alongside the application rather than being added only after the application is finished.

## Project structure

```text
app/
├── html/
│   ├── index.html
│   ├── cart.html
│   └── wishlist.html
├── img/
├── js/
└── styles/

page_object/
├── cart_page.py
└── index_page.py

tests/
├── conftest.py
├── test_cart.py
├── test_index.py
├── test_index-old.py
└── test_wishlist.py

pytest.ini
requirements.txt
installation.txt
```

## Running the tests

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

Install the Playwright Chromium browser:

```bash
playwright install chromium
```

Run the test suite:

```bash
pytest
```

## Development approach

The project is being developed incrementally, with a focus on understanding the code and testing concepts rather than relying on generated solutions.

The current focus is on:

1. Building features with HTML, CSS and JavaScript
2. Writing automated tests with pytest and Playwright
3. Learning the Page Object Model and E2E testing
4. Gradually improving the structure and maintainability of the project
5. Later introducing a Python API and persistent data

## Future plans

Planned future development includes:

- More frontend and E2E test coverage
- Python/FastAPI backend
- API testing
- Database-backed game data
- User accounts and authentication
- Persistent user-specific wishlists and game collections
- Potential integration with external game/price APIs
