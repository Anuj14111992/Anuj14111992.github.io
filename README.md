# Anuj Chauhan · Senior SDET portfolio

Live site: https://anuj14111992.github.io

A single-page portfolio (`index.html`, no build step) with Playwright tests that run on every push.

## Run the tests locally

```bash
npm install
npx playwright install chromium
npm test            # starts a local server and runs desktop + mobile tests
```

## What the tests check
- Page loads with the right title and hero
- Every nav link (About, Work, Skills, Experience, Contact) scrolls to its section, on desktop and mobile (menu)
- Email, LinkedIn and GitHub links are correct
- No JavaScript errors
- No horizontal scrolling on desktop or mobile
