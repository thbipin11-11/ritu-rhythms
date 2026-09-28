# Ritu Rhythms V11 — GitHub Pages + Supabase

This edition is static and GitHub Pages compatible. It uses Supabase for central submissions, admin authentication and editable impact numbers. No Node.js server and no Google Sheets are used.

## 1. Create a Supabase project
Create a project at https://supabase.com/.

## 2. Create tables and security rules
In Supabase SQL Editor, run `supabase.sql` from this folder.

## 3. Create your admin login
In Supabase Dashboard → Authentication → Users, create an email/password user using an email address you control and a strong password. Then copy that user's UUID.

Run:

insert into public.admins(user_id) values ('PASTE-ADMIN-USER-UUID-HERE');

The previous prototype username `ritu@123` is not used as a password or hard-coded secret in this edition. Supabase Auth handles the password securely.

## 4. Configure the website
Supabase Dashboard → Project Settings → API. Copy the Project URL and publishable/anon key into `js/supabase-config.js`:

window.RR_SUPABASE_URL = 'YOUR_PROJECT_URL';
window.RR_SUPABASE_PUBLISHABLE_KEY = 'YOUR_PUBLISHABLE_KEY';

Never put a Supabase service-role key in browser code.

## 5. Upload to GitHub
Upload everything inside the `site/` folder to the root of your repository. The site contains `.nojekyll`.

Enable GitHub Pages from Settings → Pages → Deploy from branch → main → /(root).

## 6. Use the site
Public site: your GitHub Pages URL.
Admin: your GitHub Pages URL + `/admin.html`.

The admin portal can view visitor questions, school requests and edit the four Our Impact numbers.
