# Gift Card Hub

We have our existing mongodb pluging we just have to verify and test its actives if it’s still active to used. … ScousGiftCardExchange — Full Build Roadmap

A mobile-first gift card trading platform: members trade cards for Naira, admins price, approve, and pay out. Installable as a phone app (PWA) and packaged later for the App Store and Play Store.

Design approach (non-AI-looking, campaign-heavy)

Designs come from Canva through the connected Canva account, then get imported into the app as real image assets — not AI-generated art.

Canva sets to produce:

Homepage campaign banners — rate-of-the-day, weekend bonus, referral push, "fast payout" promise (carousel, auto-rotating).

Gift card brand cards — Apple, Amazon, Steam, Razer Gold, Google Play, eBay, Sephora, Nordstrom, Visa/Vanilla, Walmart, Nike, iTunes.

App icon + splash screens (phone-app packaging, PWA install icon).

Social flyers + App Store / Play Store preview screenshots.

Motion and feel: animated favicon-style GIF/Lottie icons, subtle card tilt on tap, counting balance number, shimmer skeletons, confetti on approved trade, sound chime on credit. Brand direction: deep-night navy/charcoal base, gold-green accent for money states, one strong display typeface. Every page shows a branded 5-second loading spinner before it reveals content, as requested.

How the platform works

Sign up — name, email, phone, password. A 6-digit code is emailed; the account only opens after the code is entered. A welcome email follows.

Login — email + password, then a fresh 6-digit code by email each time. Unknown email returns "unrecognized user". Three failed attempts lock the account for 30 minutes.

Home — balance card (tap the eye to hide/show), Trade and Withdraw buttons, campaign banner carousel, live rate ticker, recent trade list, unverified-profile ribbon until bank details are added.

Trading — pick a card brand from the admin-managed list, pick country/type/value, upload photos or e-code, submit. It appears in Exchange History as "Apple gift card $25 — Pending", then moves to Successful / Used / Error / Partially paid with an admin note. Approved trades credit the Naira balance (value x rate), with a sound alert and push notification.

Live chat — in-app chat with admin, text + image, sound alert, per-trade context.

Withdraw — choose a saved bank account, amount limited by balance, flat ₦300 fee. Admin gets an alert and either sends or cancels; the user sees the outcome live.

Settings — add/delete bank accounts, change password, notification and sound toggles, hide balance default, delete exchange account.

Admin (route /ScousGiftCardExchange/admin)

Single seeded admin account (ID 197200) created once in the database, password: Adeyemi2025@ set at seed, changeable later; the password is never stored in app code.

Admin can: approve/decline/partially approve trades with a note; add, hide, or remove cards from today's market; update rates per brand/country/value band; view user balances and bank details; approve or cancel withdrawals; refund or deduct a balance; broadcast or target push notifications; read and reply to chats; view an audit log of every balance-changing action.

Data model

profiles, user_roles (separate table — never a role column on profiles), gift_card_brands, gift_card_variants (country/type/value band + rate), trades (+ trade_images), wallets and wallet_transactions (every credit/debit recorded), bank_accounts, withdrawals, chat_threads / chat_messages, notifications, login_attempts, otp_codes, campaign_banners, admin_audit_log. Row-level security throughout: users see only their own rows, admin sees all through a role check.

Phases

Phase 1 — Foundation. Enable Lovable Cloud, design system, brand tokens, database tables with security policies, seeded admin, role checks.

Phase 2 — Design production. Generate the Canva sets above, export, import into the app as assets, build the animated homepage, 5-second page loader, banner carousel, animated icons.

Phase 3 — Accounts. Signup with email code, login with email code, 3-attempt lockout, welcome email, persistent SMTP settings in the admin panel, profile + unverified ribbon.

Phase 4 — Trading. Card catalogue, rate display, upload flow, exchange history with live status, balance card with hide/show, credit on approval with sound + notification.

Phase 5 — Money out. Bank accounts, withdrawal request with ₦300 fee, admin approval alerts, wallet ledger, refunds and deductions.

Phase 6 — Admin panel. Trade queue, rates manager, market manager, users and balances, withdrawal queue, notification broadcaster, audit log.

Phase 7 — Chat and notifications. In-app chat with images, sound alerts, push notifications, notification centre.

Phase 8 — PWA and store packaging. Installable app, offline shell, icons and splash screens, store listing assets, then wrap for App Store and Play Store submission.

Phase 9 — Hardening and launch. Security review, rate limits, fraud checks on duplicate card uploads, load test, store submission checklist.

Technical notes

TanStack Start with server functions; Lovable Cloud (Postgres + auth + storage) as the backend. Card images go to a private storage bucket with signed URLs.

OTP: 6-digit codes hashed in otp_codes with a 10-minute expiry and attempt counter; delivered via the admin-configured SMTP settings stored as secrets.

Lockout: login_attempts keyed by email + IP; 3 failures within 15 minutes triggers a 30-minute lock; admin can unlock.

Money is never computed on the client. Approval, refunds, deductions, and withdrawals all run in server functions inside a transaction that writes both the wallet row and a wallet_transactions entry.

Withdrawals: requested -> approved/cancelled -> paid; the balance is held at request time so it cannot be double-spent.

Realtime subscriptions drive trade status, chat, and admin alerts.

PWA via service worker + manifest; store builds via a Capacitor wrapper reusing the same codebase.

Decisions to confirm during the build

Starting rate table per brand (you can set these in the admin panel at launch).

SMTP provider credentials for the welcome and OTP emails.

Whether referrals ship in Phase 1 or later.   # ScousGiftCardExchange — Full Build Roadmap (v2)

Mobile-first gift card trading platform: members trade cards for Naira, admins price, approve and pay out. Installable as a phone app (PWA), later packaged for App Store and Play Store.

## What was missing in v1 (now added)

- A complete route map and page-by-page layout list.

- OTP resend with a visible countdown and resend limits.

- Delete exchange account and logout flows.

- The 5-second branded loader applied to every page transition, not just the homepage.

- Physical vs e-code trade paths spelled out separately.

- Card regions (USA, UK, Germany, Australia, Canada, Italy, France, Switzerland, New Zealand, Singapore, Japan, UAE) with per-region rates.

- Admin sound alert plus an "unattended trades" queue badge.

- Brand logos as real image assets on every card tile.

- Table columns and indexes for every table.

- Empty states, error states, session expiry, offline state.

## Route map

Public

- `/` homepage (campaign banners, rates, how it works, install-app prompt)

- `/signup`, `/verify-email` (OTP + countdown), `/login`, `/login/verify` (OTP), `/forgot-password`, `/reset-password`

- `/rates` public rate board, `/support`, `/terms`, `/privacy`

Member (signed in)

- `/app` dashboard — balance card, Trade / Withdraw, banners, rate ticker, recent trades

- `/app/trade` market grid (brand logos) → `/app/trade/$brand` (region → type → value → physical/e-code) → `/app/trade/$brand/submit`

- `/app/history`, `/app/history/$tradeId` (status timeline, admin note, uploaded proof)

- `/app/withdraw`, `/app/withdraw/history`

- `/app/chat` live chat with admin

- `/app/notifications`

- `/app/settings` — profile, bank accounts, change password, sound/notification toggles, hide-balance default, **delete exchange account**, logout

Admin `/ScousGiftCardExchange/admin`

- `/` overview (pending trades count, pending withdrawals, new chats, today's volume)

- `/trades` queue with unattended badge + sound alert, `/trades/$id` approve / decline / partial with note

- `/market` brands and visibility, `/rates` per brand + region + value band

- `/users`, `/users/$id` (balance, banks, trades, manual credit/debit)

- `/withdrawals`, `/chats`, `/banners`, `/notifications` broadcaster, `/smtp` settings, `/audit`

## Page flows

**Signup** → name, email, phone, password → 6-digit code emailed → `/verify-email` shows a 10:00 countdown; **Resend** is disabled for 60s, then re-enabled, issues a brand-new code, invalidates the old one, max 5 resends/hour. Verified → welcome email → `/app`.

**Login** → email + password → fresh 6-digit code each time → same countdown/resend rules. Unknown email returns "unrecognized user". Three failed password attempts lock the account 30 minutes; the screen shows the unlock time.

**Logout** clears the session, wipes cached balances and chats, returns to `/`.

**Delete exchange account** — Settings → confirm by typing DELETE + password → blocked if balance > 0 or a trade/withdrawal is pending → soft-deletes the profile, anonymises personal data, keeps the financial ledger for audit, signs the user out.

**Trading** — market grid of brand tiles with real brand logos → pick region flag → pick card type (physical / e-code) → pick value or enter amount → live Naira payout preview (value × rate).

- Physical: upload 1–5 photos (front, back, receipt), camera or gallery.

- E-code: enter code and PIN, optional screenshot.

Submit → trade appears as Pending in Exchange History and lands instantly in the admin queue with a sound alert. Statuses: Pending → Successful / Partially paid / Used / Error, each with an admin note. Approval credits the wallet with chime + push.

**Withdraw** — saved bank account, amount ≤ balance, flat ₦300 fee, total shown before confirm → admin alert → sent or cancelled, live status.

**Every page** shows the branded 5-second loader before content reveals, driven by one shared route-transition loader component.

## Data model (tables, key columns, indexes)

- `profiles` — id (auth user), full_name, phone, email, avatar_url, is_verified, hide_balance_default, sound_enabled, push_enabled, deleted_at. Index: email, phone.

- `user_roles` — user_id, role enum (`admin`,`user`), unique(user_id, role). Roles never live on profiles; checked via a security-definer `has_role()`.

- `gift_card_brands` — name, slug, logo_url, is_visible, sort_order. Index: slug unique, is_visible.

- `gift_card_regions` — code (US, UK, DE, AU, CA, IT, FR, CH, NZ, JP, AE), name, flag_url.

- `gift_card_variants` — brand_id, region_id, card_type (`physical`,`ecode`), min_value, max_value, rate_naira, is_active. Index: (brand_id, region_id, card_type), is_active.

- `trades` — user_id, brand_id, region_id, card_type, face_value, currency, rate_at_submit, expected_payout, status, admin_note, reviewed_by, reviewed_at, ecode, ecode_pin, created_at. Index: (user_id, created_at desc), (status, created_at), reviewed_by.

- `trade_images` — trade_id, storage_path, kind. Index: trade_id.

- `wallets` — user_id unique, balance_naira, held_naira.

- `wallet_transactions` — wallet_id, type (`credit`,`debit`,`hold`,`release`,`fee`), amount, balance_after, reference_type, reference_id, note. Index: (wallet_id, created_at desc).

- `bank_accounts` — user_id, bank_name, bank_code, account_number, account_name, is_default. Index: user_id.

- `withdrawals` — user_id, bank_account_id, amount, fee (300), net_amount, status, admin_note, processed_by. Index: (status, created_at), user_id.

- `chat_threads` / `chat_messages` — thread per user (+ optional trade_id), sender_role, body, image_path, read_at. Index: (thread_id, created_at).

- `notifications` — user_id (null = broadcast), title, body, type, read_at. Index: (user_id, read_at).

- `otp_codes` — user_id, purpose (`signup`,`login`,`reset`), code_hash, expires_at (10 min), attempts, consumed_at, resend_count. Index: (user_id, purpose, expires_at).

- `login_attempts` — email, ip, succeeded, created_at; lock computed from the last 15 minutes. Index: (email, created_at).

- `campaign_banners` — image_url, link, sort_order, is_active, starts_at, ends_at.

- `smtp_settings` — host, port, username, secure, from_name, from_email (password held as a secret, not a column).

- `admin_audit_log` — actor_id, action, target_type, target_id, before, after, created_at. Index: (created_at desc).

Row-level security on every table: members read and write only their own rows; admin access goes through `has_role()`. Every new table ships with explicit grants.

## Design approach (non-AI-looking, campaign-heavy)

Designs come from Canva through the connected Canva account, exported and imported as real image assets: homepage campaign banners (rate of the day, weekend bonus, referral, fast payout), brand card tiles for Apple, Amazon, Steam, Razer Gold, Google Play, eBay, Sephora, Nordstrom, Visa/Vanilla, Walmart, Nike, iTunes; app icon and splash screens; social flyers and store screenshots.

Motion: animated GIF/Lottie favicon-style icons, card tilt on tap, counting balance number, shimmer skeletons, confetti on approval, chime on credit. Palette: deep-night navy/charcoal base, gold-green money accents, one strong display typeface.

## Phases

1. **Foundation** — Lovable Cloud, design tokens, all tables + policies + indexes, seeded admin (ID 197200, password set once at seed, never in code), role checks.

2. **Design production** — Canva sets, asset import, homepage, 5-second loader, banner carousel, animated icons.

3. **Accounts** — signup + login OTP with countdown and resend, lockout, welcome email, SMTP settings screen, profile, delete account, logout.

4. **Trading** — market grid with logos, regions, physical/e-code paths, payout preview, history with live status, balance card.

5. **Money out** — bank accounts, withdrawal with ₦300 fee, holds, wallet ledger, refunds and deductions.

6. **Admin panel** — trade queue with sound + unattended badge, rates, market, users, withdrawals, broadcaster, audit log.

7. **Chat and notifications** — chat with images, sound, push, notification centre.

8. **PWA and store packaging** — installable app, offline shell, icons, splash, store assets, Capacitor wrap.

9. **Hardening and launch** — security review, rate limits, duplicate-card fraud checks, load test, submission checklist.

## Technical notes

- TanStack Start server functions on Lovable Cloud (Postgres, auth, storage). Card images in a private bucket with signed URLs.

- OTP codes hashed, 10-minute expiry, attempt counter, resend invalidates the previous code; 60-second resend cooldown enforced server-side too.

- Money is never computed on the client: approvals, refunds, deductions and withdrawals run server-side and always write both the wallet row and a `wallet_transactions` entry.

- Withdrawals: requested → approved/cancelled → paid, with balance held at request time.

- Realtime drives trade status, chat and admin alerts.

- PWA via manifest + service worker; store builds via Capacitor on the same codebase.

## To confirm during the build

- Starting rates per brand and region (set in the admin panel at launch).

- SMTP provider credentials for welcome and OTP emails.

- Whether referrals ship early or later.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/115da0d1-eb6b-4af1-8340-6bda18ff92de).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
