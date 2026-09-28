# Ritu Rhythms — Website

A responsive, student-led menstrual health education website prototype.

## Included
- Home / mission
- Understand Your Period
- Symptoms & Experiences with search
- Period Problems & Conditions
- Menstrual Products
- Hygiene & Safety
- Period Comfort
- Myth vs Fact interactions
- When to Get Help
- Watch & Learn video links
- Ask Ritu anonymous-question demo
- Ritu Learn
- For Schools + session request form
- Research
- Impact
- Support Ritu Rhythms (financial, product, volunteer, partnership)
- About
- Contact details
- Privacy & medical disclaimer

## Contact
Email: rhythmsritu@gmail.com
Nepal: +977 9768755627
India: +91 9288162573
Instagram: https://www.instagram.com/rhythms_ritu/

## Run
Open `index.html` in a modern browser.

No backend is required for the visual demo. Forms use browser localStorage only.

## Before public launch
1. Add secure backend/database for questions and school requests.
2. Add moderation and safeguarding procedures.
3. Add proper privacy policy and consent language.
4. Have medical content reviewed by qualified professionals.
5. Replace generic video search links with selected, reputable educational videos.
6. Add current source citations to each medical page.
7. Establish appropriate legal/financial structure before accepting public donations.
8. Add real impact numbers only after activities are completed and documented.

## Visual update
Uses the supplied Ritu Rhythms logo and locally stored original decorative background illustrations; no external image host is required for these backgrounds.


## V3 updates
- Expanded Period Problems & Conditions into condition cards with: what it is, observable symptoms, what to start doing now, and when to seek care.
- Added a prevention / early-action panel with an important note that some conditions do not currently have known prevention.
- Expanded Menstrual Products into use / care / disposal guides for pads, tampons, menstrual cups, period underwear, reusable pads, pantyliners, hot water bottles, reusable heat pads, warm baths/showers and cycle tracking.
- Rebuilt Myth vs Fact as a side-by-side comparison.
- Added a Google Sheets / Google Drive storage option using Google Apps Script. See `google-apps-script/SETUP.md`.

Medical references used during development include WHO, UNICEF and NHS guidance. Review all medical content with a qualified health professional before public launch.


## Product images
The `assets/products/` folder contains the four product images supplied for this website. They are used locally in the Menstrual Products section.


## Google Sheet
This package is preconfigured with the supplied Google Sheet ID. You still need to deploy the included Apps Script as a web app and paste its `/exec` URL into `js/app.js`; the Sheet edit URL cannot be used directly by the website as a write endpoint.


## V7 additions

- Separate `admin.html` portal.
- Public site no longer displays or links to the Google Sheet URL.
- Admin portal supports server-side Apps Script login and dashboard retrieval.
- Apps Script uses the configured spreadsheet ID and stores Questions and School Requests.
- The admin portal credentials requested for this prototype are `ritu@123` / `Rhythms@1234`. Change them before a public launch.
- Paste the deployed Apps Script `/exec` URL into BOTH `js/app.js` and `js/admin.js`.
- New educational section: First Period, menstrual cycle, conception, postpartum periods, last period/menopause, and tracking.
- Uploaded educational images are stored in `assets/education/`.


## V8 fixes
- Removed persistent submission-status text beneath public form buttons.
- Added a temporary success/error toast instead.
- Fixed the admin portal's cross-origin read problem by adding JSONP support to the Apps Script service.
- The same deployed `/exec` URL must be placed in `js/app.js` and `js/admin.js` after deployment.
