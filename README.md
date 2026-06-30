# Ally & Dalton Wedding Website

Static GitHub Pages wedding website for Ally Hall and Dalton Vaughan.

## Wedding Details

- Date: Saturday, April 17, 2027
- Location: Mobile, Alabama
- Ceremony: St. Ignatius Catholic Church
- Reception: The Crystal Ballroom at The Battle House
- Rehearsal dinner: NOJA

## Site Structure

- `assets/images/` - engagement photos, venue photos, gallery images, and other site photography
- `assets/icons/` - small custom icons or decorative image assets
- `assets/documents/` - PDFs or guest documents, such as schedules or room block details
- `assets/logos/` - monograms, venue marks, or wedding logo files
- `assets/calendar/` - downloadable `.ics` calendar files for schedule events
- `index.html` - home page and wedding weekend overview
- `schedule.html` - Friday and Saturday schedule
- `venues.html` - wedding weekend venue details
- `lodging.html` - Battle House room block, hotel amenities, and venue history
- `travel.html` - airport options, flight search links, rental car resources, and live Mobile weather
- `wedding-party.html` - bridesmaids, best men, and groomsmen
- `gallery.html` - placeholder gallery for future photos
- `registry.html` - registry note and placeholder registry cards
- `faqs.html` - accordion FAQ page
- `rsvp.html` - RSVP placeholder page
- `style-guide.html` - temporary development style guide for visual consistency testing; this page is intentionally not linked in the guest navigation
- `styles.css` - shared layout, colors, responsive styles, and animation
- `script.js` - mobile navigation, RSVP placeholder behavior, and reveal animations

## Editing Content

This site is built with plain HTML, CSS, and JavaScript. There is no build step, package manager, dependency install, or framework.

To update text, edit the matching `.html` page. Shared navigation and footer markup appear on every page so the site works as simple static files on GitHub Pages.

To adjust the design, edit `styles.css`. The main color and font variables are near the top of the file so custom fonts or palette refinements can be added later.

## Images

Photo areas currently use styled placeholder blocks. When real photos are ready, place image files in `assets/images/`, replace the placeholder `<div>` elements with local image files, and use descriptive `alt` text. Keep image paths relative, such as `assets/images/ceremony.jpg`, so they work on GitHub Pages.

Logos should go in `assets/logos/`, custom icons in `assets/icons/`, and PDFs or downloadable guest materials in `assets/documents/`.

## Publishing

The site is ready for GitHub Pages as a static project. In the repository settings, enable Pages from the `main` branch and root folder. The expected project URL is:

`https://moderntransport132.github.io/ally-dalton-wedding/`

## Notes

- Keep links relative for internal pages.
- Update each page's `<title>`, meta description, and Open Graph tags if page content changes significantly.
- The animation respects `prefers-reduced-motion` for guests who prefer less motion.
- Travel page Google Flights, airport, and rental car links should be manually tested before publishing.
- The Mobile Regional Airport rental car button currently points to the official airport site until a verified rental car page is available.
- Google Flights links on the Travel page can be replaced with copied URLs from actual Google Flights searches before publishing if more precise search results are preferred.
