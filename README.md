# Evangelism

A Scripture-rooted field guide for sharing the good news of Jesus with clarity, courage, and grace. **Evangelism is a product of Saul's Podship.**

The site is designed for `https://evangelism.saulspodship.com/` and includes an installable Progressive Web App (PWA), an offline-cached app shell, conversation prompts, a local testimony-writing aid, and links to Scripture and Saul's Podship resources.

## The Field Library

`/library/` holds seven attributed field guides built from the training handouts in the shared source folder, each linking back to its original PDF:

| Guide | Author |
| --- | --- |
| Biblical Mentoring | Tariq Emmanuel |
| Communicating the Gospel in Today's Context | Tariq Emmanuel |
| Five Major Myths About Youth | Tariq Emmanuel |
| Setting and Achieving Goals for Evangelizing | Naeem Khokhar |
| Key Characteristics of Gen Z | Tariq Emmanuel |
| Biblical Stewardship | Arthur Wilson |
| Tools & Techniques to Engage Gen Z | Tariq Emmanuel |

The library also carries two on-device tools:

- **Goal planner** (`library/goal-planner.html`) — vision, mission, SMART goals across seven life areas, an action plan, and progress tracking. Saves to `localStorage` under `sauls-podship-evangelism:planner:v1`.
- **Prayer notes** (`library/prayer-notes.html`) — a private prayer wall with filters, search, and answered-request tracking. Saves under `sauls-podship-evangelism:prayer-notes:v1`.

Neither tool has a backend: nothing is uploaded, and both degrade quietly if storage is unavailable. Every guide and tool page is listed in `APP_SHELL` in `sw.js`, so the whole library is precached for offline reading. Attribution stays with the original authors; the library pages are web editions of their handouts, not replacements for them.

## Run locally

There is no package manager or build step. Serve the repository root over HTTP:

```sh
python3 -m http.server 4173 --bind 0.0.0.0
```

Then visit `http://localhost:4173`. A secure context (localhost or HTTPS) is required for service workers and PWA installation.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for custom-domain setup instructions.

## Experience, discoverability, and languages

The landing guide now opens in a warm light theme, with an optional dark-mode preference. The header includes on-device English, اردو, and हिन्दी toggles; the selected language and theme are remembered locally, Urdu switches the document to RTL, and the same controls are injected into every Field Library page.

The homepage includes an image-led hero, lightweight inline SVG visual field notes with reduced-motion-safe animation, and answer-first FAQ content. Search metadata, canonical/hreflang links, accessible headings, `HowTo`, `FAQPage`, `WebApplication`, and `Organization` structured data cover common discovery questions such as “how to share the gospel,” “what is evangelism,” respectful evangelism, gospel conversation starters, discipleship, youth ministry, and reaching Gen Z.

## Podship identity and discovery updates

All 11 public pages share the burgundy/gold/cream product identity, an accessible
responsive footer, and the explicit linked ownership statement. The homepage's
`#about` directory includes all six public apps listed by the parent site's
About page (verified 28 October 2026), not a speculative DNS inventory. Product
FAQs explain audience, tools, accounts, local storage and offline limitations.
Existing author attribution, translations, theme controls, local data keys and
interactive tools remain in place. There were no standalone privacy/terms pages
or authentication flows in the inspected project; existing inline privacy notes
are retained. The added FAQ clarifies that external services have their own
privacy practices.

Every public page has its own canonical and sharing metadata. `robots.txt` points
to `sitemap.xml`; WebSite, WebPage and publisher data supplement existing article
and application data. Homepage FAQ schema mirrors visible questions and answers.
The service-worker cache version has been advanced so existing installations
refresh the shared design.

### Validation

Run `python3 scripts/validate.py` for standard-library checks of all public pages,
metadata, ownership, local links, headings, image alt attributes, JSON-LD, the app
directory and sitemap. Run `node --check` on the JavaScript files for syntax.
This remains a static site with no build step or package-managed test suite.

Automated browser validation was attempted, but Chromium could not be downloaded
because the environment blocks its download host. Desktop/mobile rendering,
interactive regression, RTL layouts and actual offline installation still need
a browser check. No live deployment, DNS changes, independent sibling-app policy
checks, search indexing or AI citation behavior are claimed. The parent page
reader did not expose the parent's footer: this footer adapts its verified brand,
resource routes and YouTube link, rather than claiming a pixel-exact reproduction
or inventing additional social or legal links.
