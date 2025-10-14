# 📊 Database Schema for Fork Owners

## ⚠️ Important for Forks

This project uses **Supabase** with specific database tables. If you're deploying a fork, you need to create these tables in your own Supabase project.

## Required Tables

### 1. `ads` (New - Optional)
**Purpose:** Display advertisements in the app

**SQL to create:**
```sql
CREATE TABLE ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link_url TEXT,
  
  active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  
  -- Targeting
  rua_id INTEGER, -- NULL for generic ads
  match_keywords TEXT[], -- Keywords to match historias
  
  -- Scheduling
  start_at TIMESTAMPTZ,
  end_at TIMESTAMPTZ,
  
  -- Placement
  placement TEXT DEFAULT 'auto' -- 'top', 'inline', 'auto'
);

-- Index for performance
CREATE INDEX idx_ads_active ON ads(active);
CREATE INDEX idx_ads_rua_id ON ads(rua_id);
```

**Note:** The app will work WITHOUT this table. Ads simply won't show.

---

### 2. `quiz_questions`
**Purpose:** Quiz questions by city

**SQL to create:**
```sql
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  
  question TEXT NOT NULL,
  option_1 TEXT NOT NULL,
  option_2 TEXT NOT NULL,
  option_3 TEXT NOT NULL,
  option_4 TEXT NOT NULL,
  answer INTEGER NOT NULL CHECK (answer >= 1 AND answer <= 4),
  
  city TEXT, -- 'gramado', 'canela', or NULL for general
  difficulty TEXT DEFAULT 'medium' -- 'easy', 'medium', 'hard'
);
```

---

### 3. `quiz`
**Purpose:** Store quiz submissions

**SQL to create:**
```sql
CREATE TABLE quiz (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  
  answers JSONB NOT NULL,
  score NUMERIC,
  meta JSONB, -- { name, email, city, percentage }
  user_id TEXT
);
```

---

### 4. Other Tables (If using full features)

The app may reference these tables (check your specific implementation):
- `historias` - Stories/historical content
- `ruas` - Streets
- `cidades` - Cities
- `autores` - Authors
- `obras` - Works/publications
- `orgs` - Organizations
- `sites` - Reference sites
- `negocios` - Businesses

---

## How to Set Up Your Database

### Option 1: Minimal Setup (App will work)
1. Create Supabase project
2. Add environment variables to Vercel
3. **Skip database setup**
4. App will deploy but database features won't work

### Option 2: Quiz Only
1. Create Supabase project
2. Run SQL for `quiz_questions` and `quiz` tables
3. Add environment variables to Vercel
4. Quiz feature will work

### Option 3: Full Setup
1. Create Supabase project
2. Run SQL for all tables
3. Populate with your own data
4. Add environment variables to Vercel
5. All features will work

---

## Current Build Behavior

**The app is now configured to:**
- ✅ Build successfully even if tables don't exist
- ✅ Show console warnings instead of errors
- ✅ Gracefully skip features that require missing tables
- ✅ Display placeholder content where needed

**What happens without database:**
- ❌ Quiz won't work (no questions)
- ❌ Ads won't show (no ads table)
- ❌ Dynamic content won't load
- ✅ Static pages will work
- ✅ UI will render correctly

---

## For Fork Owners: Quick Start

### Minimal Deployment (No Database)
```bash
# 1. Add to Vercel environment variables:
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-key

# 2. Deploy - app will build successfully
```

### With Database
```bash
# 1. Create Supabase project
# 2. Run SQL scripts above
# 3. Add real credentials to Vercel:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-real-anon-key

# 4. Deploy - all features will work
```

---

## Checking What's Missing

After deployment, open browser console:
```
🔧 Supabase Browser Client Configuration
  NEXT_PUBLIC_SUPABASE_URL: ✅ Configured
  NEXT_PUBLIC_SUPABASE_ANON_KEY: ✅ Configured

⚠️ Ads table does not exist in this Supabase project
⚠️ Ads feature not available
```

This tells you exactly what's missing!

---

## Migration from Original Repo

If you're the fork owner and want the same data:

**You CANNOT access the original database.** You need to:
1. Create your own Supabase project
2. Create the tables
3. Either:
   - Import data if provided
   - Create your own content
   - Use placeholder data

**The original maintainer's database is private and separate.**

---

## Summary

- ✅ App builds without database (placeholder mode)
- ✅ App builds with partial database (some features work)
- ✅ App builds with full database (all features work)
- ✅ No build failures due to missing tables
- ✅ Clear console warnings about what's missing

**For fork owners:** Start with minimal setup, add database features as needed.
