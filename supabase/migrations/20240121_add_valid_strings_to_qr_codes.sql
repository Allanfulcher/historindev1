-- Add valid_strings column to qr_codes table
ALTER TABLE qr_codes 
ADD COLUMN IF NOT EXISTS valid_strings TEXT[] DEFAULT '{}';

-- Update existing QR codes to have their ID as a valid string
UPDATE qr_codes 
SET valid_strings = ARRAY[id] 
WHERE valid_strings = '{}' OR valid_strings IS NULL;

-- Make valid_strings NOT NULL
ALTER TABLE qr_codes 
ALTER COLUMN valid_strings SET NOT NULL;

-- Add a check constraint to ensure at least one valid string
ALTER TABLE qr_codes
ADD CONSTRAINT qr_codes_valid_strings_not_empty 
CHECK (array_length(valid_strings, 1) > 0);

-- Create an index for faster string lookups
CREATE INDEX IF NOT EXISTS qr_codes_valid_strings_idx ON qr_codes USING GIN(valid_strings);
