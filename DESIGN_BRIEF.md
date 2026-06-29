# Design Brief

## Overall Mood

Ally and Dalton's wedding website should feel like luxury wedding stationery brought to life online. The mood is Southern, romantic, editorial, polished, warm, and guest-friendly. It should feel personal and graceful rather than trendy or overly ornate.

The experience should suggest a formal Mobile, Alabama wedding weekend with classic hospitality, refined details, and a sense of celebration. Every page should feel considered, calm, and easy for guests to use.

## Color Usage

Primary palette:

- Navy: `#172f60`
- Soft blue: `#b0d5f0`
- Soft green: `#cbdea7`
- Blush: `#f4c0af`
- White and warm ivory for backgrounds

Use navy as the main text color and primary anchor for the design. White and warm ivory should do most of the background work so the site feels open, elegant, and readable.

Use soft blue, soft green, and blush as accents, not as large competing color blocks. They work best in thin borders, subtle gradients, small decorative details, hover states, dividers, and quiet background washes.

Avoid letting the site become dominated by one accent color. The palette should feel layered and balanced, like stationery with thoughtful ink, paper, and floral detail.

## Typography Direction

Use `Cormorant Garamond` as the primary serif for body text and headings. It should feel classic, editorial, and wedding-appropriate while staying readable for practical guest information.

Use `Luxurious Script` only for select accent moments, such as the couple's names or refined decorative name treatments. Do not use it for long headings, navigation, body copy, schedule details, or anything guests need to scan quickly.

Use `Montserrat` for the clean small-caps layer: navigation, buttons, labels, eyebrow text, schedule time pills, and utility details.

Headings should be elegant and spacious without becoming hard to read. Body text should remain comfortable for guests scanning practical details on phones.

The CSS should continue using font variables so custom fonts can be adjusted later without rewriting page markup.

Avoid overly modern corporate sans-serif styling, script fonts used heavily, novelty typefaces, or anything that harms readability.

## Spacing Rules

Use generous white space, especially around heroes, section headings, and important calls to action. The layout should breathe.

Keep practical pages easy to scan. Schedule items, venue details, FAQs, and RSVP notes should have enough spacing to feel elevated but not so much that guests have to work to find information.

Use consistent section padding and intentional rhythm across pages. Cards should be reserved for places where they improve clarity, such as venue details, wedding party profiles, registry options, FAQs, and schedule event information. Introductory and emotional sections should feel more editorial, with generous whitespace, fine rules, soft dividers, overlapping image moments, and restrained decorative accents.

On mobile, reduce vertical spacing thoughtfully so pages remain elegant without becoming long and tiring.

## Animation Rules

Animation should feel luxurious, romantic, smooth, and intentional.

Use subtle page-load motion for hero content, slow scroll-triggered reveals, gentle hover states, and soft timeline entrance effects. Decorative motion can be used sparingly, such as slow floating or drifting accents.

Section reveals should feel editorial and unhurried. Avoid snappy, app-like transitions. Underline animations on text links and navigation should be smooth, restrained, and stationery-inspired.

Animation should never distract from guest information. It should support the mood, not become the main event.

Always respect `prefers-reduced-motion`. Guests who prefer less motion should still receive a polished, complete experience.

## Page-By-Page Design Priorities

### Home

The home page is the emotional first impression. It should feel like an invitation opening into the wedding weekend. Prioritize the couple's names, date, location, RSVP, schedule, venue preview, gallery teaser, and final RSVP call-to-action.

### Schedule

The schedule should be beautiful but highly scannable. Times, locations, attire, and event descriptions must be easy to find. Desktop can use a timeline layout; mobile should use stacked cards.

### Venues

The venues page should introduce the wedding weekend settings, not become a travel guide. Use elegant editorial sections or venue cards with image placeholders, descriptions, addresses, and website buttons.

### Wedding Party

The wedding party page should feel personal and celebratory. Separate bridesmaids and groomsmen visually while keeping the design cohesive. Placeholder portraits should feel intentional and ready for future photos.

### Gallery

The gallery should feel romantic and editorial. Use a clean image grid with varied rhythm on desktop and simple stacked images on mobile. It should feel ready for engagement and wedding weekend photos.

### Registry

The registry page should be gracious and understated. The language should emphasize presence first, gifts second. Registry cards should feel warm and polished, not transactional.

### FAQs

The FAQ page should feel refined and useful. Accordion items should be easy to tap, keyboard-accessible, and readable on small screens.

### RSVP

The RSVP page should feel formal, clear, and reassuring. The form placeholder should prepare guests for future functionality without looking unfinished.

## What To Avoid

- Corporate dashboard styling
- Generic wedding template layouts
- Childish colors, icons, or animations
- Flashy motion or gimmicky effects
- Side navigation menus
- Copying reference-site layout, photos, wording, or branding
- Overly decorative script typography
- Stock-photo-like visuals that do not feel personal
- Crowded content or tiny tap targets
- Heavy dark sections that reduce the warm stationery feeling
- Remote image dependencies for core site visuals
- Broken links, placeholder links presented as final, or unclear RSVP actions

## Inspiration Categories

- Luxury wedding invitations
- Southern wedding stationery
- Editorial bridal magazines
- Fine art wedding photography layouts
- Historic hotel wedding weekends
- Letterpress details, monograms, borders, and delicate line art
- Classic church ceremony programs
- Elegant reception menus and escort cards
- Editorial wedding websites with fixed decorative metadata, generous whitespace, and refined underline interactions

## Mobile Design Principles

Mobile guests should be able to find details quickly with one hand.

Navigation should be simple, tap targets should be comfortable, and buttons should stack naturally. No text should overflow or require horizontal scrolling.

Hero sections should remain elegant without taking over the entire phone experience. Schedule cards, FAQ items, venue sections, and RSVP content should be immediately readable.

Keep typography large enough for real-world use, especially when guests are checking addresses, times, attire, or parking information during the wedding weekend.

Mobile should feel like the same luxury experience as desktop, not a reduced afterthought.
