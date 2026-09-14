# ScousGiftCardExchange — Build Roadmap (living blueprint)

Status key: [ ] not started · [~] in progress · [x] done

## Phase 1 — Foundation

- [x] Lovable Cloud enabled
- [x] Database: all tables, indexes, row-level security, grants
- [x] Roles in separate `user_roles` table + `has_role()` check
- [x] Private storage bucket for card proof images
- [x] Brand design tokens (deep-night navy/charcoal, gold-green money accents, display typeface)
- [x] Shared 5-second branded page loader
- [x] Seeded admin account (code 197200)

## Phase 2 — Design production

- [x] Homepage with campaign banner carousel (placeholder art, Canva-swappable)
- [x] Brand tiles for 12 brands + region flags
- [ ] App icon and splash screens
- [x] Motion: card tilt, counting balance, shimmer skeletons, confetti on approval, chime on credit

## Phase 3 — Accounts

- [x] Signup (name, email, phone, password)
- [x] Email 6-digit code, 10-min countdown, 60s resend cooldown, max 5/hour
- [x] Welcome email
- [x] Login with fresh code each time; "unrecognized user" for unknown email
- [x] 3 failed attempts = 30-minute lock, unlock time shown
- [x] Profile page + unverified ribbon
- [x] Logout
- [x] Delete exchange account (typed DELETE + password, blocked if balance/pending)
- [x] Admin mail-settings screen

## Phase 4 — Trading

- [x] Market grid with brand tiles
- [x] Region picker (US, UK, DE, AU, CA, IT, FR, CH, NZ, JP, AE, SG)
- [x] Physical vs e-code paths
- [x] Live Naira payout preview
- [x] Photo upload 1–5 / code + PIN
- [x] Exchange history + status timeline + admin note
- [x] Balance card with hide/show

## Phase 5 — Money out

- [x] Bank accounts (add/delete/default)
- [x] Withdrawal request, ₦300 fee, total before confirm
- [x] Balance held at request time
- [x] Wallet ledger
- [x] Refunds and manual deductions

## Phase 6 — Admin panel (`/ScousGiftCardExchange/admin`)

- [x] Overview
- [x] Trade queue, unattended badge, sound alert
- [x] Approve / decline / partial with note
- [x] Rates per brand + region + value band
- [x] Market visibility
- [x] Users: balances, banks, manual credit/debit
- [x] Withdrawal queue
- [x] Banner manager
- [x] Notification broadcaster
- [x] Mail settings
- [x] Audit log

## Phase 7 — Chat and notifications

- [x] Chat with admin (text + images, trade context)
- [x] Sound alerts
- [x] Notification centre
- [ ] Push notifications

## Phase 8 — App packaging

- [ ] PWA manifest + service worker + offline shell
- [ ] Icons and splash screens
- [ ] Store listing assets
- [ ] Capacitor wrap

## Phase 9 — Hardening and launch

- [ ] Security review
- [ ] Rate limits
- [ ] Duplicate-card fraud checks
- [ ] Load test
- [ ] Submission checklist

## Open items

- Starting rates per brand/region — set in the admin panel at launch
- Referrals — not scheduled yet
- Canva exports — swap in when ready
- MongoDB is not usable on this runtime; backend is Lovable Cloud (Postgres)
