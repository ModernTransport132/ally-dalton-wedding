---
name: Ally & Dalton Wedding Website
description: Luxury Southern wedding stationery brought to life as a guest-friendly static website.
colors:
  navy-ink: "#172f60"
  soft-blue: "#b0d5f0"
  soft-green: "#cbdea7"
  blush: "#f4c0af"
  white-paper: "#ffffff"
  ivory-wash: "#fffaf7"
  muted-ink: "#52617a"
typography:
  display:
    fontFamily: "Cormorant Garamond Light, Cormorant Garamond, Georgia, Times New Roman, Times, serif"
    fontWeight: 300
    lineHeight: 0.95
    letterSpacing: "0"
  script:
    fontFamily: "Luxurious Script, Brush Script MT, cursive"
    fontWeight: 400
    lineHeight: 0.72
    letterSpacing: "0"
  body:
    fontFamily: "Cormorant Garamond, Georgia, Times New Roman, Times, serif"
    fontWeight: 500
    lineHeight: 1.68
  label:
    fontFamily: "Josefin Sans, Arial, Helvetica, sans-serif"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.12em"
  numeral:
    fontFamily: "Lora, Georgia, Times New Roman, Times, serif"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0"
rounded:
  hairline: "2px"
  button: "4px"
  card: "8px"
  pill: "999px"
spacing:
  2xs: "clamp(0.5rem, 0.45rem + 0.25vw, 0.7rem)"
  xs: "clamp(0.75rem, 0.68rem + 0.35vw, 1rem)"
  sm: "clamp(1rem, 0.9rem + 0.5vw, 1.35rem)"
  md: "clamp(1.5rem, 1.25rem + 1.15vw, 2.25rem)"
  lg: "clamp(2.25rem, 1.75rem + 2.25vw, 3.75rem)"
  xl: "clamp(3.5rem, 2.5rem + 4.5vw, 6.5rem)"
  section: "clamp(4.25rem, 3rem + 6vw, 8rem)"
  section-tight: "clamp(3rem, 2.35rem + 3.2vw, 5rem)"
components:
  button-primary:
    backgroundColor: "{colors.navy-ink}"
    textColor: "{colors.white-paper}"
    rounded: "{rounded.button}"
    padding: "0.75rem 1.35rem"
    height: "48px"
    typography: "{typography.label}"
  button-secondary:
    backgroundColor: "{colors.white-paper}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.button}"
    padding: "0.75rem 1.35rem"
    height: "48px"
    typography: "{typography.label}"
  card-surface:
    backgroundColor: "{colors.white-paper}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.card}"
    padding: "1.35rem"
  nav-link:
    textColor: "{colors.navy-ink}"
    typography: "{typography.label}"
    padding: "0.55rem 0.65rem"
    height: "44px"
---

# Design System: Ally & Dalton Wedding Website

## 1. Overview

**Creative North Star: "The Southern Letterpress Weekend"**

This visual system should feel like formal wedding stationery that has learned how to move: crisp navy ink, white and ivory paper, delicate accent washes, fine rules, and careful type hierarchy. It is a brand surface first and a utility second, so every schedule time, venue address, travel detail, and RSVP state should feel cared for without becoming corporate.

The system is romantic and editorial, but not magazine-generic. It earns polish through restraint: limited accent color, generous rhythm, fine borders, soft shadows, real wedding/place imagery when available, and slow motion. It explicitly rejects rustic styling, modern-minimalist coldness, too much pink, overly formal stiffness, generic wedding-template patterns, and anything that feels like a corporate website.

Most guests will use the site from phones before and during the weekend. Phone layouts must keep logistics direct: single-column flows, safe-area-aware navigation, 48px touch targets, no hover-dependent behavior, and no hidden guest information. Desktop can carry richer sticky and scroll-driven compositions, but those effects are progressive enhancements; the static layout must remain polished and complete.

**Key Characteristics:**
- Navy is the ink; white is the base paper; ivory is a secondary wash, not the default page color.
- Soft blue, soft green, and blush are accents, never the whole room.
- Serif type carries warmth, script type carries emotion, and Josefin Sans labels carry clarity.
- Cards and bordered panels are used when they organize real guest information.
- Motion should feel smooth, slow, and intentional, with reduced-motion alternatives.
- Performance is part of the guest experience: large imagery needs WebP companions, lazy loading below the fold, explicit dimensions, and deferred scripts.

**The Invitation First Rule.** Every page should feel like part of the wedding invitation before it feels like a logistics hub. Utility is welcome; corporate utility is not.

**The Mobile Guest Rule.** If a guest might need it in a hurry, the information must be readable, tappable, and available on a phone without a hover state or a long animation.

**The Progressive Motion Rule.** Signature motion can make the site memorable, but content must be visible and usable without it. Reduced-motion users get the hierarchy, not the choreography.

## 2. Colors

The palette is a restrained stationery palette: navy ink, white paper, a light ivory wash, and three soft floral accents used as letterpress details.

### Primary
- **Navy Ink**: The main text, button, border, rule, and grounding color. Use it wherever the site needs authority, legibility, or formal structure.

### Secondary
- **Soft Blue**: A cool wedding-stationery accent for gradients, animated borders, dividers, airport cards, and calm supporting washes.
- **Soft Green**: A botanical accent for balance, travel cards, subtle gradient stops, and fine internal rules.

### Tertiary
- **Blush**: A romantic accent for focus rings, dividers, hover details, and soft warmth. Use it sparingly so the site never becomes too pink.

### Neutral
- **White Paper**: The dominant surface. Most pages, headers, cards, and text areas should remain white.
- **Ivory Wash**: A warm secondary background for welcome, intro, and soft contextual sections. It is not the hero default.
- **Muted Ink**: Supporting copy, labels, metadata, and helper text. Keep it readable; do not lighten it into low-contrast gray.

### Named Rules

**The Ink And Paper Rule.** Navy and white do most of the work. Accents should feel like letterpress details, not large decorative blocks.

**The Not Too Pink Rule.** Blush is a grace note. If a screen reads pink before it reads wedding weekend, the balance is wrong.

**The White Base Rule.** Heroes and primary page surfaces should default to white unless a specific section has earned ivory or navy. Ivory and rose shadows are prohibited as generic decoration.

**The Three-Accent Balance Rule.** Soft blue, soft green, and blush should appear together often enough to feel intentional, but none should dominate the site alone.

## 3. Typography

**Display Font:** Cormorant Garamond Light, loaded as Cormorant Garamond weight 300, with Cormorant Garamond, Georgia, and Times fallbacks.
**Body Font:** Cormorant Garamond, with Georgia and Times fallbacks.
**Label/Mono Font:** Josefin Sans for navigation, buttons, metadata, small-caps labels, and utility details.
**Script Accent Font:** Luxurious Script for the couple's names and selected emotional headings only.
**Numeral Font:** Lora for selected weather temperatures and numeric accents where a softer, bookish figure style helps practical information feel less utilitarian.

**Character:** The pairing is formal and warm: Cormorant gives the site its editorial wedding voice, Luxurious Script gives select moments a personal invitation quality, and Josefin Sans keeps guest logistics scannable.

### Hierarchy
- **Display** (300, tight line-height): Page and hero-level titles when the page needs a formal announcement. Size should be chosen per layout, viewport, and content length.
- **Script** (400, compact line-height): The couple's names and occasional emotional feature titles. Never use it for long practical information.
- **Headline** (300 to 400, balanced line-height): Section headings and page-level editorial statements. Scale by section importance rather than a fixed token size.
- **Title** (400, compact to comfortable line-height): Cards, panels, stacked guide items, and schedule moments.
- **Body** (500, generous line-height): Guest-facing prose and practical details. Keep readable line lengths near 65 to 75 characters.
- **Label** (700 to 800, uppercase/small-caps tracking): Navigation, buttons, metadata, time pills, and short labels. Size must remain context-aware so labels never become too small to scan.

### Named Rules

**The Script Restraint Rule.** Luxurious Script is reserved for names and emotional emphasis. It is forbidden for navigation, schedule details, venue addresses, travel data, FAQs, forms, and body copy.

**The Guest Clarity Rule.** If a guest might need it in a hurry, Josefin Sans labels and Cormorant body text must stay large, high-contrast, and easy to scan on a phone.

**The Light Display Rule.** Display headings use the light Cormorant weight for ceremony and air. Do not fake lightness by lowering opacity or contrast.

## 4. Elevation

The site uses a hybrid of fine borders, tonal surfaces, and soft ambient shadows. Elevation should feel like layered paper, not floating app cards. Shadows are gentle and navy-tinted; borders are often more important than blur.

### Shadow Vocabulary
- **Soft Paper Lift** (`0 18px 45px rgba(23, 47, 96, 0.12)`): Default elevated card treatment for framed guest-information panels.
- **Quiet Card Lift** (`0 18px 44px rgba(23, 47, 96, 0.07)`): Schedule cards and lighter information surfaces.
- **Hover Lift** (`0 22px 52px rgba(23, 47, 96, 0.12)`): Hover state for cards that can respond without becoming playful.
- **Button Lift** (`0 16px 34px rgba(23, 47, 96, 0.18)`): Primary button hover state.
- **Photo Lift** (`0 16px 34px rgba(23, 47, 96, 0.08)`): Neutral image and gallery placeholder shadows. Do not use ivory or rose glows around image containers.

### Named Rules

**The Layered Paper Rule.** Use borders, dividers, and pale fills before adding bigger shadows. If a shadow reads like a dashboard tile, it is too heavy.

**The Fine Rule Rule.** One-pixel navy-tinted lines, soft blue lines, blush lines, and gradient dividers are part of the brand language. Use them more readily than thick decorative blocks.

**The Neutral Shadow Rule.** Photo containers and placeholders use navy/black-neutral shadows. Rose and ivory halos are prohibited except in a deliberately named venue or floral section.

## 5. Components

Components should feel like wedding stationery made functional: crisp edges, clear labels, restrained movement, and enough structure that guests can scan quickly.

### Buttons
- **Shape:** Lightly squared with a 4px radius for canonical site buttons.
- **Primary:** Navy background, white text, 1px navy border, minimum 48px height, and 0.75rem 1.35rem padding.
- **Secondary:** White background, navy text, 1px navy border.
- **Hover / Focus:** Buttons lift by 2px and gain a navy-tinted shadow. Focus uses a 2px blush outline with 4px offset.
- **Text:** Josefin Sans, bold, uppercase/small-caps, with 0.085em to 0.12em letter spacing.
- **Experiments:** The text-reveal and outline-grow buttons are comparison experiments, not canonical button defaults. Do not spread them site-wide until a single button system is chosen.

### Chips

The site does not use a broad chip system. When a pill is needed, such as a calendar link, map selector, flip control, or small action, it uses a 999px radius, fine navy border, white translucent fill, and Josefin Sans uppercase text.

### Cards / Containers
- **Corner Style:** 8px radius for true cards; 2px radius for image placeholders and framed photography. Avoid large 24px+ card rounding.
- **Background:** Usually white or white with very light transparency; ivory supports softer contextual sections only.
- **Shadow Strategy:** Soft Paper Lift or Quiet Card Lift only.
- **Border:** 1px navy-tinted border by default; selected schedule, venue, and travel surfaces can use scroll-driven gradient borders.
- **Internal Padding:** 1.35rem for simple card bodies, 1.8rem to 3rem for feature cards and editorial panels.
- **Travel Cards:** Airport cards may flip, but front/back button treatment should stay consistent with the canonical button system.

### Inputs / Fields

Inputs and RSVP placeholders should inherit the same paper-and-rule language as cards: white or ivory surfaces, navy text, readable labels, 4px to 8px corners, and blush focus treatment. Error, disabled, loading, and pending states should remain calm and explicit rather than loud.

### Navigation

Navigation is a sticky white header with a centered width, logo at left, and Josefin Sans small-caps links. Links use an underline reveal instead of background pills. On mobile and travel tablet breakpoints, the menu opens as a white panel with staggered links. The circular menu button uses navy lines, a gentle hover wash, a tap compression, and an X morph when open.

### Signature Component: Stacked Guest Guide

The home page guide uses sticky stacked panels rather than ordinary cards. These panels should stay less transparent than the page behind them, use large serif headings, and preserve the feeling of turning through the wedding weekend one page at a time. Mobile versions must not trap guests in a long scroll sequence when direct access is more useful.

### Signature Component: Scroll Gradient Border

Schedule, venue, and travel cards can use a conic-gradient border driven by scroll. The animation belongs on the border only; the card interior should stay quiet, readable, and paper-like.

### Signature Component: Cinematic Invitation Hero

The home cover arrives with a subtle paper reveal, fine rules drawing into place, and a scroll-tied background drift where supported. The countdown can catch a quiet light pass, but the names and date remain the focal point.

## 6. Do's and Don'ts

### Do:
- **Do** make the site feel like an invitation first and a logistics hub second.
- **Do** use navy ink on white paper as the default reading experience.
- **Do** reserve ivory wash for softer contextual sections, not every hero or full-page background.
- **Do** keep guest details scannable on mobile, especially times, addresses, attire, lodging, travel, RSVP, and FAQ content.
- **Do** use soft blue, soft green, and blush in thin borders, gradient dividers, subtle fills, and animated border accents.
- **Do** keep motion slow, smooth, and purposeful, and always preserve reduced-motion alternatives.
- **Do** use real or project-specific imagery when imagery is needed; the site should feel personal rather than stock.
- **Do** make weather, calendar, RSVP, and coming-soon states explicit instead of leaving blanks or dead links.
- **Do** let long venue names, addresses, RSVP copy, weather labels, and navigation items wrap rather than overflow.

### Don't:
- **Don't** make the site rustic.
- **Don't** make the site modern minimalist or cold.
- **Don't** make the site too pink.
- **Don't** make the site overly formal or stiff.
- **Don't** make the site look like a generic wedding template.
- **Don't** make anything feel like a corporate website or dashboard.
- **Don't** make travel, lodging, or schedule pages feel like a travel agency.
- **Don't** overuse script type, especially in navigation, schedule details, addresses, FAQs, forms, or travel data.
- **Don't** crowd practical pages; elegance here means space plus clarity, not density.
- **Don't** use repeated tiny uppercase eyebrows as automatic section scaffolding unless they are doing real orientation work.
- **Don't** use decorative rose or ivory shadows around photo placeholders; use regular neutral shadows.
- **Don't** create more button shapes or animations without reconciling them into the canonical button system.
