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
