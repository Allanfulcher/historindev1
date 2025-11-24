-- Drop and recreate popup_ads table
-- This ensures a clean slate with correct configuration

-- Drop the table and all dependencies
DROP TABLE IF EXISTS popup_ads CASCADE;

-- Drop the trigger function if it exists
DROP FUNCTION IF EXISTS update_popup_ads_updated_at() CASCADE;

-- Create popup_ads table for QR code business advertisements
CREATE TABLE popup_ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ad content
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  question TEXT NOT NULL,
  answers TEXT[] NOT NULL, -- Array of 2-4 answer options
  image_url TEXT,
  
  -- Business info
  business_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  website TEXT,
  
  -- Targeting
  street_ids INTEGER[] NOT NULL DEFAULT '{}',
  
  -- Status
  active BOOLEAN DEFAULT TRUE
);

-- RLS is NOT enabled - admin operations work freely
-- Service role bypasses RLS anyway, so this is the correct approach

-- Create indexes for performance
CREATE INDEX idx_popup_ads_active ON popup_ads(active);
CREATE INDEX idx_popup_ads_street_ids ON popup_ads USING GIN(street_ids);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_popup_ads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER popup_ads_updated_at
  BEFORE UPDATE ON popup_ads
  FOR EACH ROW
  EXECUTE FUNCTION update_popup_ads_updated_at();

-- Add comment
COMMENT ON TABLE popup_ads IS 'Advertisements shown in QR code popups for local businesses. RLS disabled to allow admin operations.';
