/**
 * Feature Flags Configuration
 * 
 * TEMPORARY: Features are hardcoded as DISABLED until backend is configured.
 * 
 * To enable features later:
 * 1. Set FEATURES_ENABLED = true below
 * 2. Or use environment variables (see comments)
 */

// ============================================================================
// 🟢 MASTER SWITCH - All features enabled
// ============================================================================
const FEATURES_ENABLED = true;
// ============================================================================

export const featureFlags = {
  /**
   * Master switch for all new features
   */
  allFeaturesEnabled: FEATURES_ENABLED,

  /**
   * Google Authentication
   * Requires: Google OAuth configured in Supabase, user_profiles table
   */
  googleAuth: FEATURES_ENABLED,

  /**
   * QR Code Hunt feature
   * Requires: qr_codes table, user_qr_scans table
   */
  qrCodeHunt: FEATURES_ENABLED,

  /**
   * Quiz result saving to database
   * Requires: quiz table with proper schema
   */
  quizSaving: FEATURES_ENABLED,

  /**
   * User profile page
   * Requires: user_profiles table, quiz results
   */
  userProfile: FEATURES_ENABLED,

  /**
   * Popup Ads from database
   * Requires: popup_ads table
   */
  popupAds: FEATURES_ENABLED,

  /**
   * QR Code Ads
   * Requires: ads table
   */
  qrAds: FEATURES_ENABLED,
};

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(feature: keyof typeof featureFlags): boolean {
  return featureFlags[feature];
}

/**
 * Get all disabled features (useful for debugging)
 */
export function getDisabledFeatures(): string[] {
  return Object.entries(featureFlags)
    .filter(([_, enabled]) => !enabled)
    .map(([name]) => name);
}

export default featureFlags;
