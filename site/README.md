# The Vaughan Wedding

This folder is the editable source for Alexandra and Dalton's website. Make changes here, then run Build-GitHub.ps1 to refresh ../github-pages-ready. Do not hand-edit generated copies in docs.

The build validates local links, images, styles, anchors, sharing metadata, main headings, the five static schedule events, and homepage link targets before copying the finished site. The resulting GitHub folder includes editable source, dependency-free build/check commands, and a GitHub workflow to check future commits.

Public URLs and page descriptions live in site.config.json. The current address is https://www.allyanddalton2027.com/. Sharing uses assets/wedding-share.jpg, made from the existing monogram. If descriptions or the domain change, rebuild the package; generated publishing metadata follows the configuration.

Run Start-preview.ps1 to preview at http://localhost:4178/home. The server also serves the custom 404 page for missing URLs. Stop and restart this preview after editing server.cjs.

The site contains Home, Schedule, Venues, Lodging, Travel, Wedding Party, Gallery, FAQs, RSVP, and Registry. Gallery has 13 photos; FAQs contain the approved answers. Wedding-party photos/bios and RSVP/Registry remain unfinished. Five calendar downloads include confirmed end times.

Original gallery JPEGs, the original FAQ photo, and the original hotel illustration remain here for safekeeping; optimized versions are used online. The intro video plays once per session on mobile, with Skip and reduced-motion fallbacks.

Building only updates local files. It does not commit, push, publish, or change domain settings.
