# Dr. Mohamad Izani — Personal Website

A clean, modern academic website with five pages: **About**, **Publications**, **Projects & Grants**, **Travel**, and **Contact**. Built as plain HTML/CSS/JS — no build step, no dependencies to install.

## Files

```
website/
├── index.html          About / academic profile (hero, education, experience, skills, editorial, awards)
├── publications.html   Journal articles, books & chapters, conference papers (with filter)
├── projects.html       Featured projects, research grants, courses taught
├── travel.html         Photo gallery of conferences, talks & academic trips
├── contact.html        Contact details, academic profiles, message form
└── assets/
    ├── style.css       Shared theme (navy / slate, serif headings)
    ├── main.js         Nav, scroll animations, publication filter, gallery lightbox
    ├── profile.jpg     Your headshot (extracted from your CV)
    └── gallery/        Drop your travel photos here
```

## Preview locally

Double-click `index.html` to open it in any browser. All pages link to each other.

## Add your travel photos

1. Copy your photos into `assets/gallery/` (e.g. `florence.jpg`).
2. In `travel.html`, find the tile you want and replace its placeholder
   `<div class="ph">…</div>` with:
   `<img src="assets/gallery/florence.jpg" alt="Florence, Italy">`
3. Photos open full-screen in a lightbox when clicked. The caption comes from the tile's `data-caption` attribute.

## Publish to www.izanizainal.com

The site is static, so any host works. Pick whichever matches how your domain is set up.

**Option A — Standard web host (cPanel / FTP).** Upload the **contents** of the `website/` folder (not the folder itself) into your host's `public_html` (or `www`) directory. `index.html` must sit at the root so it loads at `izanizainal.com`. Keep the `assets/` folder alongside it.

**Option B — Netlify (free, drag-and-drop).** Go to app.netlify.com → *Add new site* → *Deploy manually* → drag the `website` folder in. Then add your custom domain `izanizainal.com` under *Domain settings* and point your DNS as instructed.

**Option C — GitHub Pages.** Create a repo, push these files, enable Pages (Settings → Pages → deploy from `main`), then add `izanizainal.com` as the custom domain and set a `CNAME` DNS record.

## Notes

- Fonts (Source Serif 4 + Inter) load from Google Fonts, so the site needs an internet connection to show the intended typography; it falls back to system fonts offline.
- The contact form opens the visitor's email app with the message pre-filled (no server needed). To use a hosted form instead, services like Formspree or Netlify Forms can be dropped in later.
- All content was drawn from your 2025 CV. The publications page shows a curated selection with a link to your full Google Scholar record.
