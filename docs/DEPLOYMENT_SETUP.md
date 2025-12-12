# Historin - Full Deployment Setup Guide

Complete setup guide for deploying Historin with all features enabled.

---

## 1. Supabase SQL Tables

Run these SQL commands in **Supabase > SQL Editor** in order:

### 1.1 User Profiles Table

```sql
-- User profiles (linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);
```

### 1.2 User Quiz Results Table

```sql
-- Quiz results per user
CREATE TABLE IF NOT EXISTS user_quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  city TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  percentage NUMERIC NOT NULL,
  answers JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_user_quiz_results_user_id ON user_quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_user_quiz_results_city ON user_quiz_results(city);

-- RLS policies
ALTER TABLE user_quiz_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own quiz results" ON user_quiz_results;
CREATE POLICY "Users can view own quiz results"
  ON user_quiz_results FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own quiz results" ON user_quiz_results;
CREATE POLICY "Users can insert own quiz results"
  ON user_quiz_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### 1.3 QR Codes Table (for QR Hunt)

```sql
-- QR codes for the hunt game
CREATE TABLE IF NOT EXISTS qr_codes (
  id TEXT PRIMARY KEY,
  rua_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  coordinates JSONB NOT NULL,
  valid_strings TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  active BOOLEAN DEFAULT TRUE
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_qr_codes_active ON qr_codes(active);
CREATE INDEX IF NOT EXISTS idx_qr_codes_rua_id ON qr_codes(rua_id);
CREATE INDEX IF NOT EXISTS qr_codes_valid_strings_idx ON qr_codes USING GIN(valid_strings);

-- RLS - public read, no write from client
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active QR codes" ON qr_codes;
CREATE POLICY "Anyone can view active QR codes"
  ON qr_codes FOR SELECT
  USING (active = true);
```

### 1.4 User QR Scans Table

```sql
-- Track user QR code scans
CREATE TABLE IF NOT EXISTS user_qr_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  qr_code_id TEXT NOT NULL REFERENCES qr_codes(id) ON DELETE CASCADE,
  scanned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, qr_code_id)
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_user_qr_scans_user_id ON user_qr_scans(user_id);

-- RLS policies
ALTER TABLE user_qr_scans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own scans" ON user_qr_scans;
CREATE POLICY "Users can view own scans"
  ON user_qr_scans FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own scans" ON user_qr_scans;
CREATE POLICY "Users can insert own scans"
  ON user_qr_scans FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### 1.5 Popup Ads Table (Optional)

```sql
-- Popup ads for businesses
CREATE TABLE IF NOT EXISTS popup_ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  question TEXT NOT NULL,
  answers TEXT[] NOT NULL,
  image_url TEXT,
  business_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  website TEXT,
  street_ids INTEGER[] NOT NULL DEFAULT '{}',
  active BOOLEAN DEFAULT TRUE
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_popup_ads_active ON popup_ads(active);
CREATE INDEX IF NOT EXISTS idx_popup_ads_street_ids ON popup_ads USING GIN(street_ids);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_popup_ads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS popup_ads_updated_at ON popup_ads;
CREATE TRIGGER popup_ads_updated_at
  BEFORE UPDATE ON popup_ads
  FOR EACH ROW
  EXECUTE FUNCTION update_popup_ads_updated_at();
```

---

## 2. Google OAuth Setup

### 2.1 Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Go to **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth client ID**
5. Select **Web application**
6. Add these **Authorized redirect URIs**:
   ```
   https://YOUR_SUPABASE_PROJECT.supabase.co/auth/v1/callback
   ```
7. Copy the **Client ID** and **Client Secret**

### 2.2 Supabase Auth Settings

1. Go to **Supabase Dashboard > Authentication > Providers**
2. Find **Google** and enable it
3. Paste your **Client ID** and **Client Secret**
4. Save

### 2.3 Supabase URL Configuration

1. Go to **Supabase Dashboard > Authentication > URL Configuration**
2. Set **Site URL**:
   ```
   https://your-domain.com
   ```
3. Add to **Redirect URLs**:
   ```
   https://your-domain.com/auth/callback
   http://localhost:3000/auth/callback
   ```

---

## 3. Vercel Environment Variables

Add these in **Vercel > Project Settings > Environment Variables**:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Supabase service role key (for server-side) |

Find these in **Supabase > Settings > API**

---

## 4. Quick Checklist

### Supabase
- [ ] Run all SQL migrations (Section 1)
- [ ] Enable Google provider in Auth settings
- [ ] Configure Site URL and Redirect URLs
- [ ] Verify tables exist in Table Editor

### Google Cloud
- [ ] Create OAuth credentials
- [ ] Add Supabase callback URL
- [ ] Copy Client ID and Secret to Supabase

### Vercel
- [ ] Add all 3 environment variables
- [ ] Redeploy after adding variables

---

## 5. Testing

After setup, test these flows:

1. **Google Login**: Click "Entrar com Google" in menu
2. **Profile Page**: Visit `/perfil` after login
3. **Quiz Saving**: Complete a quiz while logged in, check `/perfil` for results
4. **QR Hunt**: Visit `/caca-qr` (requires QR codes in database)

---

## 6. Adding Sample QR Codes (Optional)

```sql
INSERT INTO qr_codes (id, rua_id, name, description, coordinates, valid_strings, active)
VALUES 
  ('qr-1', 1, 'Praça Central', 'QR code na praça', '{"lat": -29.123, "lng": -51.123}', ARRAY['qr-1', 'praca-central'], true),
  ('qr-2', 2, 'Igreja Matriz', 'QR code na igreja', '{"lat": -29.124, "lng": -51.124}', ARRAY['qr-2', 'igreja-matriz'], true);
```

---

## Troubleshooting

### "Invalid login credentials"
- Check Google OAuth Client ID/Secret in Supabase
- Verify redirect URLs match exactly

### "User profile not found"
- Check if `handle_new_user` trigger exists
- Manually insert profile if needed:
  ```sql
  INSERT INTO user_profiles (id, email, name)
  SELECT id, email, raw_user_meta_data->>'name'
  FROM auth.users WHERE id = 'USER_UUID';
  ```

### Quiz results not saving
- Check RLS policies on `user_quiz_results`
- Verify user is authenticated before saving
