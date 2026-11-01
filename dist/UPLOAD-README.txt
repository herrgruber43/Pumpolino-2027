PUMPOLINO – upload package
==========================
Upload the CONTENTS of this folder (not the folder itself) to the web root of
pumpolino.com, replacing the old files.

BEFORE GOING LIVE
  Legal pages (/legal/, /de/legal/, /fr/legal/) contain highlighted «TODO»
  fields (name, address, e-mail, UID, VAT). Fill them in src/legal.mjs and run
  `node build.mjs`, or paste your old legal text and ask Claude to update it.

WHAT'S INCLUDED
  /            English        /de/  Deutsch        /fr/  Français
  /legal/ /de/legal/ /fr/legal/   legal notice in 3 languages
  /process /art /pumps-and-art /contact   redirect the old URLs to the new sections
  /assets/og.png                  social preview image
  404.html, sitemap.xml, robots.txt

AFTER UPLOADING
  - Make sure the host serves 404.html for unknown URLs.
  - Test the contact form once (it posts to Web3Forms).
  - Re-submit sitemap.xml in Google Search Console.
