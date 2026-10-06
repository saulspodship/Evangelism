# Deployment: `evangelism.saulspodship.com`

This is a static, no-build-step site with a web app manifest and service worker. It can be hosted from the repository root on Vercel or another HTTPS-capable static host.

## Vercel

1. Import `saulspodship/Evangelism` as a new Vercel project.
2. Set the framework preset to **Other** (or leave it as static), with no build command and the repository root as the output directory.
3. Deploy the default branch after merging this work.
4. In **Project → Settings → Domains**, add `evangelism.saulspodship.com`.
5. Apply the DNS record Vercel displays for that hostname. For a subdomain, this is commonly a `CNAME` to `cname.vercel-dns.com`; use the exact target shown in the Vercel project and allow time for DNS propagation.
6. Confirm the domain resolves over HTTPS. HTTPS is required for the installable PWA and service worker.

If this site is meant to ship directly from an Arena branch before a merge, choose that branch as the Vercel deployment branch. The repository contains no hosting credentials or domain/DNS configuration, so those dashboard steps cannot be applied from source code alone.

### Serving the Field Library

`/library/` is a real directory with an `index.html`, so every static host serves it without extra configuration:

- `/library/` and `/library/index.html` both resolve to the library hub.
- Guide pages are addressed with explicit filenames, e.g. `/library/biblical-stewardship.html`.
- `vercel.json` only sets headers for `sw.js` and `manifest.webmanifest`; no rewrites are needed for the library.
- On first load the service worker precaches all seven guides plus both tools, so a reader who has opened the site once can visit the library with no connection.

## Local preview

From the repository root, run:

```sh
python3 -m http.server 4173 --bind 0.0.0.0
```

Open `http://localhost:4173`. The service worker is available on localhost; on a live site it is served only over HTTPS. The app shell, its prompts, and the whole Field Library are cached for offline use after the first successful visit. The hero artwork and outbound Bible / Saul's Podship links require an internet connection.

To exercise the offline behaviour properly, load the site once, then use the browser's DevTools to switch the network to **Offline** and navigate to `/library/` and any guide page.
