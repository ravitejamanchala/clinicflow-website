# ClinicFlow website

Standalone static marketing site for ClinicFlow. This is **not** the clinical application and contains no patient database, authentication, payment handling or enquiry collection.

## Preview

Serve this directory with any static HTTP server, for example `python3 -m http.server 4173`, then open `http://localhost:4173`.

## Publish

GitHub Pages uses the **GitHub Actions** source. Pushing `main` runs `.github/workflows/pages.yml`, which publishes only HTML, CSS, JavaScript and assets. Relative asset URLs support the `/clinicflow-website/` repository path. No build dependencies or secrets are required.

## Content and provenance

- Application reviewed at `1bf0da3` in `ravitejamanchala/clinicflow-uk` on 25 September 2026.
- `assets/workspace.png` is the application's documented fictional-data screenshot (`docs/screenshots/03-dashboard-admin.png`). Never replace it with a real-patient screenshot.
- Hero and feature illustrations are labelled illustrative; they are not a live application.
- No invented testimonials, customer counts, certifications, outcome statistics or live NHS/lab/SMS integration claims.
- Contact currently opens the founder's user-supplied LinkedIn profile. Replace with a confirmed business contact/demo URL when provided. There is no fake form submission or booking confirmation.
- The privacy dialog describes this static website only, not the clinical application's obligations.

## Maintenance

Edit content in `index.html`, visual tokens/layout in `styles.css` and interactions in `site.js`. Journey copy is in the `stages` array. Check mobile widths, keyboard navigation, reduced motion, both dialogs and all four journey stages before publishing.
