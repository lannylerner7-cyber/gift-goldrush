# ScousGiftCardExchange — Build Blueprint

## First, an important correction about MongoDB

I checked the project: there is no MongoDB plugin here, and nothing is connected. It is a blank app.

There is also a hard technical blocker. This app runs on an edge server that cannot open the kind of direct database connection MongoDB requires, and MongoDB's own hosted HTTPS alternative was retired in 2024. So a MongoDB backend cannot be made to work here, no matter the credentials.

What this means for you:

- Built-in Lovable Cloud is the backend I will build on. It gives the database, user logins, file storage, emailed codes, realtime updates and per-user security rules your roadmap depends on — all the things your plan assumes.
- If you have existing data in a MongoDB somewhere, I can import it into the new database later; send an export when you get there.

Everything below assumes Lovable Cloud. If you would rather stop and discuss the database, reject this plan and say so.

## How we will work through it

I will create `roadmap.md` at the top of the project as the living blueprint: every phase, every page, every item from your brief, each marked not started / in progress / done. I update it as we go, and re-read it before finishing each phase so nothing is dropped. You can open it any time to see status.

We build phase by phase in order. Each phase ends with a working, checkable app.

## Phase 1 — Foundation

- Turn on Lovable Cloud.
- Brand look: deep-night navy/charcoal base, gold-green money accents, one strong display typeface, mobile-first.
- All tables from your data model, with per-user security rules and admin role checks. Roles live in their own table, never on the profile.
- Private storage bucket for card photos, viewed through short-lived signed links.
- Seeded admin account, ID 197200, password set once at seed and never written into the app's code.
- Shared 5-second branded loader used on every page change.

## Phase 2 — Design production

Placeholder artwork for now, built so Canva exports drop straight in later: homepage banner carousel, brand tiles for all 12 brands, region flags, app icon and splash. Motion: card tilt on tap, counting balance, shimmer skeletons, confetti on approval, chime on credit.

## Phase 3 — Accounts

Signup, emailed 6-digit code with a 10-minute countdown, resend locked for 60 seconds and capped at 5 per hour, welcome email, login with a fresh code each time, "unrecognized user" for unknown emails, 3 failed attempts = 30-minute lock showing the unlock time, profile page with the unverified ribbon, logout, delete-account flow with its guards.

Note: emails use the built-in mail service, as you chose. The admin mail-settings screen is still built, so you can point it at your own provider later.

## Phase 4 — Trading

Market grid with brand tiles, region picker (US, UK, DE, AU, CA, IT, FR, CH, NZ, JP, AE, SG), physical vs e-code paths, live Naira payout preview, photo upload (1–5) or code + PIN, exchange history with live status timeline and admin notes, balance card with hide/show.

## Phase 5 — Money out

Bank accounts, withdrawal request with the flat ₦300 fee and total shown before confirm, balance held at request time, full wallet ledger, refunds and deductions. All money maths runs on the server, never in the phone.

## Phase 6 — Admin panel

At `/ScousGiftCardExchange/admin`: overview, trade queue with unattended badge and sound alert, approve / decline / partial with note, rates per brand + region + value band, market visibility, users with balances and banks and manual credit/debit, withdrawal queue, banner manager, notification broadcaster, mail settings, audit log of every balance change.

## Phase 7 — Chat and notifications

Per-user chat thread with admin, text and images, optional trade context, sound alerts, push notifications, notification centre.

## Phase 8 — App packaging

Installable phone app (PWA) with offline shell, icons and splash screens, store listing assets, then the wrapper for App Store and Play Store.

## Phase 9 — Hardening and launch

Security review, rate limits, duplicate-card fraud checks, load test, submission checklist.

## Technical notes

- TanStack Start server functions; Lovable Cloud (Postgres + auth + storage + realtime).
- Codes stored hashed with expiry, attempt counter and server-side resend cooldown; a new code invalidates the previous one.
- Approvals, refunds, deductions and withdrawals write the wallet row and a ledger entry together in one transaction.
- Withdrawal states: requested → approved/cancelled → paid, with the balance held on request.
- Realtime drives trade status, chat and admin alerts.
- Capacitor wrap in Phase 8 reuses the same codebase.

## Open items

- Starting rates per brand and region — set in the admin panel at launch.
- Referrals: not in Phase 1; tell me when you want them.
- Canva exports: swap in whenever ready.

## Starting point

If you approve, I begin with Phase 1 and create the roadmap file in the same step.
