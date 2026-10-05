# Evangelism

A Scripture-rooted field guide for sharing the good news of Jesus with clarity, courage, and grace. **Evangelism is a product of Saul's Podship.**

The site is designed for `https://evangelism.saulspodship.com/` and includes an installable Progressive Web App (PWA), an offline-cached app shell, conversation prompts, a local testimony-writing aid, and links to Scripture and Saul's Podship resources.

## Run locally

There is no package manager or build step. Serve the repository root over HTTP:

```sh
python3 -m http.server 4173 --bind 0.0.0.0
```

Then visit `http://localhost:4173`. A secure context (localhost or HTTPS) is required for service workers and PWA installation.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for custom-domain setup instructions.
