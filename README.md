# Alexandra & Dalton — wedding website

Edit the site folder; docs is generated. No dependencies need installing.

## Build and check

Run npm run build from this folder with Node.js installed. It rebuilds docs and checks local links, assets, anchors, metadata, headings, the schedule fallback, and homepage link targets at both root and repository-prefix URLs. Run npm run check to check the existing docs folder. The public address lives in site/site.config.json.

In the original design workspace, edit outputs/the-vaughan-wedding and run its Build-GitHub.ps1 (or node work/package-github-pages.cjs). That refreshes this entire folder, including its editable source snapshot. Never hand-edit both copies.

## Publish

Copy this folder into your GitHub repository and commit it. In Settings → Pages, deploy from your branch's /docs folder. Source lives outside docs and is not part of the served site. Keep any existing domain/DNS settings. This build does not publish or change them.

Routes use /home/, /schedule/, /venues/, /lodging/, /travel/, /wedding-party/, /gallery/, /registry/, /faqs/, and /rsvp/. Root and older .html links redirect and contain sharing metadata. A custom 404 page returns visitors home. After publishing, test the public link preview and calendar imports on a real phone.

Original full-resolution photos remain in the local design folder; the repository uses optimized assets. RSVP and Registry remain unfinished; wedding-party photos and biographies are pending.
