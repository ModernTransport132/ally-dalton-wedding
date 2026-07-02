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
    fontFamily: "Inter, sans-serif"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.085em"
  numeral:
    fontFamily: "Lora, Georgia, Times New Roman, Times, serif"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0"
  nav:
    fontFamily: "Josefin Sans, Arial, Helvetica, sans-serif"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.1em"
rounded:
  hairline: "2px"
  card: "8px"
  calendar-small: "14px"
  button: "20px"
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
    backgroundColor: "{colors.white-paper}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.button}"
    padding: "0 1.35rem"
    height: "48px"
    typography: "{typography.label}"
  button-secondary:
    backgroundColor: "{colors.navy-ink}"
    textColor: "{colors.white-paper}"
    rounded: "{rounded.button}"
    padding: "0 1.35rem"
    height: "48px"
    typography: "{typography.label}"
  calendar-link-small:
    backgroundColor: "{colors.white-paper}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.calendar-small}"
    padding: "0 0.9rem"
    height: "34px"
    typography: "{typography.label}"
  card-surface:
    backgroundColor: "{colors.white-paper}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.card}"
    padding: "1.35rem"
  nav-link:
    textColor: "{colors.navy-ink}"
    typography: "{typography.nav}"
    padding: "0.55rem 0.65rem"
    height: "44px"
---

# Design System: Ally & Dalton Wedding Website

## 1. Overview

**Creative North Star: "The Southern Letterpress Weekend"**

This visual system should feel like formal Southern wedding stationery made useful online: crisp navy ink, white paper, delicate floral accents, fine rules, personal venue photography, and practical information that feels cared for. It is a digital invitation first and a logistics guide second.

The current site is romantic, polished, and guest-friendly without becoming a generic wedding template. It uses white as the base surface, navy as the grounding ink, soft blue as the main interaction accent, and ivory only as a secondary wash for sections that have earned warmth. The home hero uses the schedule floral background stretched to the full desktop width; it should feel like patterned paper, not a tinted gradient panel.

Most guests will use the site from phones before and during the weekend. Schedules, addresses, attire, lodging, airport details, weather, and RSVP information must stay direct and readable. Desktop can carry richer stacked panels, overlapping venue imagery, and slow editorial motion, but practical content must remain visible without hover or animation.

**Key Characteristics:**
- Navy is the ink; white is the base paper.
- Ivory is a supporting wash, not the default hero or page color.
- Soft blue, soft green, and blush are letterpress accents, never dominant room colors.
- Cormorant carries warmth, Luxurious Script carries emotion, Inter carries utility, and Josefin Sans is reserved for navigation.
- Real place imagery should replace generic placeholders whenever an approved asset exists.
- Motion is slow and optional; information is always usable without it.

**The Invitation First Rule.** Every page should feel like part of Ally and Dalton's invitation before it feels like a logistics hub.

**The Mobile Guest Rule.** If a guest might need it quickly, it must be readable, tappable, and available on a phone without hover.

**The White Paper Rule.** Heroes and primary page surfaces default to white or real imagery. Do not use ivory or rose gradients as generic hero backgrounds.

## 2. Colors

The palette is a restrained stationery palette: navy ink, white paper, a light ivory wash, and three soft floral accents used as thin rules, borders, underlights, and quiet fills.

### Primary
- **Navy Ink**: The main text, rule, button, border, and grounding color. Use it anywhere the site needs formality, authority, or legibility.

### Secondary
- **Soft Blue**: The main accent for button borders, button underlights, fine schedule lines, map controls, airport details, and calm interactive states.
- **Soft Green**: A botanical counterpoint for travel cards, subtle gradient stops, and secondary accent balance.

### Tertiary
- **Blush**: A romantic accent for focus rings, very occasional dividers, and floral balance. It must remain a grace note.

### Neutral
- **White Paper**: The dominant surface for pages, cards, headers, buttons, heroes, and practical information.
- **Ivory Wash**: A warm secondary wash for selected contextual bands. It is not the hero default and should not spread across the home screen.
- **Muted Ink**: Supporting copy, metadata, labels, and helper text. Keep it readable; never fade it into low-contrast gray.

### Named Rules

**The Ink And Paper Rule.** Navy and white do most of the work. Accents should feel like printed details, not decorative blocks.

**The Not Too Pink Rule.** Blush is sparing. If a screen reads pink before it reads wedding weekend, the balance is wrong.

**The No Warm Glow Rule.** Do not use ivory or rose shadows around photos, placeholders, countdowns, or generic panels. Shadows must be neutral navy or black-tinted.

**The Full-Width Floral Rule.** When the schedule floral background is used as a hero image, it should stretch to the available desktop width rather than appearing as a narrow wallpaper strip.

## 3. Typography

**Display Font:** Cormorant Garamond Light, loaded through Cormorant Garamond weight 300, with Cormorant Garamond, Georgia, and Times fallbacks.  
**Body Font:** Cormorant Garamond, with Georgia and Times fallbacks.  
**Label/Utility Font:** Inter, sans-serif, for buttons, metadata, weather labels, airport details, and compact practical labels.  
**Navigation Font:** Josefin Sans for navigation links only.  
**Script Accent Font:** Luxurious Script for the couple's names and selected emotional headings only.  
**Numeral Font:** Lora for selected weather temperatures and numeric accents.

**Character:** The type system is formal and warm, but it must stay useful. Cormorant gives the wedding voice, Luxurious Script gives selected moments a personal invitation quality, Inter keeps guest logistics crisp, and Josefin Sans gives the navigation its own small-caps identity.

### Hierarchy
- **Display** (300, tight line-height): Page titles, hero names, and formal section statements. Size is chosen per layout and copy length rather than fixed in the design document.
- **Script** (400, compact line-height): Couple names and occasional emotional phrases. Never use it for practical information.
- **Headline** (300 to 400, balanced line-height): Section headings and editorial statements.
- **Title** (400, compact to comfortable line-height): Cards, venue names, schedule moments, airport names, and home guide panels.
- **Body** (500, generous line-height): Guest-facing prose and details. Keep readable line lengths near 65 to 75 characters.
- **Label** (700 to 800, uppercase/small-caps tracking): Buttons, map controls, calendar links, metadata, and short utility labels. Size must stay context-aware; the schedule card calendar buttons intentionally use a much smaller label.
- **Navigation** (700, uppercase/small-caps tracking): Main navigation links in Josefin Sans only.

### Named Rules

**The Script Restraint Rule.** Luxurious Script is reserved for names and emotional emphasis. It is forbidden for navigation, schedules, venue addresses, travel data, FAQs, forms, and body copy.

**The Navigation Exception Rule.** Josefin Sans is reserved for navigation. Do not spread it into buttons, cards, metadata, body copy, or headings.

**The No Fixed Font Size Rule.** DESIGN.md documents roles, not rigid font sizes. Choose actual sizes per component, viewport, and copy length so labels never become unreadably tiny.

**The Guest Clarity Rule.** If a guest may need the information in a hurry, the text must remain high-contrast, wrap safely, and stay scannable on mobile.

## 4. Elevation

The system uses a hybrid of fine borders, translucent paper surfaces, and soft navy-tinted shadows. Elevation should feel like layered stationery, not app cards. Borders and rules often matter more than blur.

### Shadow Vocabulary
- **Soft Paper Lift** (`0 18px 45px rgba(23, 47, 96, 0.12)`): Default elevated treatment for framed guest-information panels.
- **Quiet Card Lift** (`0 18px 44px rgba(23, 47, 96, 0.07)`): Schedule cards and lighter information surfaces.
- **Photo Lift** (`0 16px 34px rgba(23, 47, 96, 0.08)`): Neutral image and gallery placeholder shadows.
- **Primary Button Underlight** (`0 14px 18px -10px rgba(176, 213, 240, 0.95)`): Soft-blue underlight for white primary buttons.
- **Secondary Button Underlight** (`0 14px 18px -10px rgba(23, 47, 96, 0.38)`): Restrained navy underlight for navy secondary buttons.

### Named Rules

**The Layered Paper Rule.** Use borders, translucent white, and fine rules before adding larger shadows. If a surface reads like a dashboard tile, the shadow is too heavy.

**The Fine Rule Rule.** One-pixel navy-tinted or soft-blue lines are core brand material. Use them for schedule time strips, dividers, map selectors, and framed content.

**The Countdown Clarity Rule.** The home countdown timer must not have a shadow, blur, or warm glow. It sits on the floral hero as a clean paper-like grid.

## 5. Components

Components should feel like wedding stationery made functional: crisp edges, clear labels, restrained movement, and enough structure that guests can scan quickly.

### Buttons
- **Shape:** Canonical site buttons use a 20px radius, 48px height, centered label, no vertical padding, and 1.35rem horizontal padding.
- **Primary:** White background, navy text, 1px soft-blue border, and a soft-blue underlight.
- **Secondary:** Navy background, white text, navy border, and a restrained navy underlight.
- **Hover / Focus:** Primary fills navy, turns text white, and shifts the underlight to white while shrinking slightly. Secondary fills white, turns text navy, shifts to soft-blue border/underlight, and shrinks slightly. Focus keeps a visible blush outline.
- **Active / Touch:** Taps use the same color inversion as hover with a deeper press scale.
- **Text:** Inter, bold, uppercase/small-caps, with tight but readable tracking.
- **Experiments:** Text-reveal and outline-grow buttons are comparison experiments only. Do not spread them into production without reconciling them into the canonical button system.

### Chips

The site does not use a broad chip system. When a small utility action is needed, use the established control style for that context instead of inventing a new chip. Schedule calendar links are compact 34px actions with a 14px radius and much smaller Inter text. Venue map controls are larger secondary-style controls with icons.

### Cards / Containers
- **Corner Style:** True cards use 8px radius; framed photography and image placeholders use 2px radius. Airport flip cards are a deliberate exception with 30px rounded neumorphic faces.
- **Background:** Usually white or white with light transparency. Ivory supports selected contextual sections only.
- **Shadow Strategy:** Use Soft Paper Lift or Quiet Card Lift for cards; use Photo Lift for photography. Never use rose or ivory halos around image containers.
- **Border:** 1px navy-tinted borders by default. Schedule, venue, and travel surfaces may use gradient borders when the animation is limited to the border.
- **Internal Padding:** Simple cards use about 1.35rem; editorial and schedule cards use larger padding.
- **Image Placeholders:** Replace placeholders with approved real images when available. The home venue story uses St. Ignatius as the main image and NOJA table setting as the overlapping smaller image, cropped with object-fit so the layout stays fixed.

### Inputs / Fields

Inputs and RSVP placeholders inherit the paper-and-rule language: white or ivory surfaces, navy text, readable labels, 4px to 8px corners, and blush focus treatment. Error, disabled, loading, and pending states must remain calm and explicit rather than loud.

### Navigation

Navigation is a sticky white header with a logo at left and Josefin Sans small-caps links. Links use underline reveal instead of background pills. On mobile and tablet breakpoints, the menu opens as a white panel with staggered links. The circular menu button uses navy lines, gentle hover wash, tap compression, and an X morph when open.

### Signature Component: Home Floral Hero

The home hero uses the schedule floral background as full-width patterned paper, with navy script names and a clean countdown grid. The countdown has no shadow or blur. The image must remain broad and airy on desktop and not collapse into a narrow wallpaper strip.

### Signature Component: Schedule Time Strip

Schedule times are not pills or buttons. They sit in a centered translucent white band with a fine fading line above and below. The effect should read like stationery rules, not an interactive control.

### Signature Component: Airport Flip Cards

Travel airport cards use a rounded, soft-shadow card face that flips for details. Front controls say "More info" with a right arrow; back controls say "Less info" with a left arrow. Back-side action buttons use the canonical primary button style and need enough padding on mobile.

### Signature Component: Stacked Guest Guide

The home guide uses stacked panels rather than ordinary cards. Keep the panels clear, readable, and less transparent than the page behind them. Mobile versions must not trap guests in a long scroll sequence when direct access is more useful.

## 6. Do's and Don'ts

### Do:
- **Do** make the site feel like an invitation first and a logistics hub second.
- **Do** use navy ink on white paper as the default reading experience.
- **Do** use real venue and place imagery when an approved asset exists.
- **Do** keep the home hero floral background full-width on desktop.
- **Do** keep schedule time labels as fine-line translucent strips, not pills.
- **Do** keep schedule calendar buttons small inside schedule cards so they do not overpower the event content.
- **Do** reserve ivory wash for selected contextual sections, not every hero or full-page background.
- **Do** keep guest details scannable on mobile, especially times, addresses, attire, lodging, travel, RSVP, and FAQ content.
- **Do** use soft blue, soft green, and blush in thin borders, gradient dividers, subtle fills, and animated border accents.
- **Do** keep motion slow, smooth, purposeful, and optional with reduced-motion alternatives.
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
- **Don't** use decorative rose or ivory shadows around photo placeholders, real photos, countdowns, or generic panels.
- **Don't** create more button shapes or animations without reconciling them into the canonical button system.
- **Don't** leave "Photo coming soon" placeholders where a real approved image already exists.
