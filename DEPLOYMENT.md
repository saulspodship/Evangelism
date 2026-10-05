# Deployment: `evangelism.saulspodship.com`

This is a static, no-build-step site with a web app manifest and service worker. It can be hosted from the repository root on Vercel or another HTTPS-capable static host.

## Vercel

1. Import `saulspodship/Evangelism` as a new Vercel project.
2. Set the framework preset to **Other** (or leave it as static), with no build command and the repository root as the output directory.
3. Deploy the default branch after merging this work.
4. In **Project → Settings → Domains**, add `evangelism.saulspodship.com`.
5. Apply the DNS record Vercel displays for that hostname. For a subdomain, this is commonly a `CNAME` to `cname.vercel-dns.com`; use the exact target shown in the Vercel project and allow time for DNS propagation.
6. Confirm the domain resolves over HTTPS. HTTPS is required for the installable PWA and service worker.

If this site is meant to ship directly from the current Arena branch before a merge, choose `arena/071c25b2-evangelism` as the Vercel deployment branch. The repository contains no hosting credentials or domain/DNS configuration, so those dashboard steps cannot be applied from source code alone.

## Local preview

From the repository root, run:

```sh
python3 -m http.server 4173 --bind 0.0.0.0
```

Open `http://localhost:4173`. The service worker is available on localhost; on a live site it is served only over HTTPS. The app shell and its prompts are cached for offline use after the first successful visit. The hero artwork and outbound Bible / Saul's Podship links require an internet connection.
