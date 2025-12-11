# Deploying Without Backend Setup

This guide explains how to deploy Historin when the backend (Supabase tables, Google OAuth) isn't configured yet.

## Current Status

Features are **DISABLED** by a hardcoded flag in `src/config/featureFlags.ts`:

```typescript
const FEATURES_ENABLED = false;  // TODO: Set to true after backend setup
```

This disables:
- ✅ Google Login (hidden from menu)
- ✅ QR Code Hunt (shows "Em breve" page)
- ✅ Quiz result saving (quiz works, just doesn't save to DB)
- ✅ User profiles (shows "Em breve" page)
- ✅ Popup Ads from database
- ✅ QR Code Ads

## What Users Will See

| Feature | When Disabled |
|---------|---------------|
| **Login Button** | Hidden from menu |
| **Profile Page** | "Em Breve!" message with link to home |
| **QR Hunt Page** | "Em Breve!" message |
| **Quiz** | Works normally, but results aren't saved |

## Enabling Features (When Backend is Ready)

### Step 1: Edit the feature flags file

Open `src/config/featureFlags.ts` and change:

```typescript
const FEATURES_ENABLED = false;
```

to:

```typescript
const FEATURES_ENABLED = true;
```

### Step 2: Commit and redeploy

```bash
git add src/config/featureFlags.ts
git commit -m "Enable features after backend setup"
git push
```

## Backend Setup Checklist

Before enabling features, ensure:

### For Google Auth:
- [ ] Google Cloud Console OAuth configured
- [ ] Supabase Google provider enabled
- [ ] Redirect URIs set correctly
- [ ] `user_profiles` table created with trigger

### For Quiz Saving:
- [ ] `user_quiz_results` table created
- [ ] RLS policies configured

### For QR Hunt:
- [ ] `qr_codes` table created
- [ ] `user_qr_scans` table created
- [ ] RLS policies configured

### For Popup Ads:
- [ ] `popup_ads` table created

## File Location

**Feature Flags Config**: `src/config/featureFlags.ts`
