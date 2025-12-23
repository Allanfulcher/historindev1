/**
 * QR Service
 * 
 * Centralized service for QR code hunt operations.
 * Handles QR code scanning, validation, and progress tracking.
 */

import { supabaseBrowser } from '@/lib/supabase/client';
import type { Database } from '@/types/database.types';
import { featureFlags } from '@/config/featureFlags';

type QrCode = Database['public']['Tables']['qr_codes']['Row'];
type UserQrScan = Database['public']['Tables']['user_qr_scans']['Row'];

// ============================================================================
// QR CODE OPERATIONS
// ============================================================================

/**
 * Get all active QR codes
 */
async function getAllQrCodes(): Promise<QrCode[]> {
  // Return empty if feature is disabled
  if (!featureFlags.qrCodeHunt) {
    return [];
  }

  try {
    const { data, error } = await supabaseBrowser
      .from('qr_codes')
      .select('*')
      .eq('active', true)
      .order('rua_id', { ascending: true });

    if (error) {
      console.error('Error fetching QR codes:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('QR Hunt feature not available:', err);
    return [];
  }
}

/**
 * Get QR code by ID
 */
async function getQrCodeById(qrCodeId: string): Promise<QrCode | null> {
  const { data, error } = await supabaseBrowser
    .from('qr_codes')
    .select('*')
    .eq('id', qrCodeId)
    .eq('active', true)
    .single();

  if (error) {
    console.error('Error fetching QR code:', error);
    return null;
  }

  return data;
}

/**
 * Validate if scanned string is a valid QR code
 * Checks if the scanned value matches any of the valid strings for any QR code
 */
async function validateQrCode(scannedValue: string): Promise<QrCode | null> {
  // Get all active QR codes
  const { data, error } = await supabaseBrowser
    .from('qr_codes')
    .select('*')
    .eq('active', true);

  if (error || !data) {
    console.error('Error fetching QR codes for validation:', error);
    return null;
  }

  // Find QR code where any valid_string is contained within scannedValue (substring match)
  const qrCode = data.find(qr => 
    qr.valid_strings && qr.valid_strings.some((validStr: string) => scannedValue.includes(validStr))
  );

  return qrCode || null;
}

// ============================================================================
// USER SCAN OPERATIONS
// ============================================================================

/**
 * Get user's scanned QR codes
 */
async function getUserScans(userId: string): Promise<UserQrScan[]> {
  // Return empty if feature is disabled
  if (!featureFlags.qrCodeHunt) {
    return [];
  }

  try {
    const { data, error } = await supabaseBrowser
      .from('user_qr_scans')
      .select('*')
      .eq('user_id', userId)
      .order('scanned_at', { ascending: false });

    if (error) {
      console.error('Error fetching user scans:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('QR Hunt feature not available:', err);
    return [];
  }
}

/**
 * Check if user has already scanned a QR code
 */
async function hasUserScanned(userId: string, qrCodeId: string): Promise<boolean> {
  const { data, error } = await supabaseBrowser
    .from('user_qr_scans')
    .select('id')
    .eq('user_id', userId)
    .eq('qr_code_id', qrCodeId)
    .limit(1);

  if (error) {
    console.error('Error checking scan:', error);
    return false;
  }

  return (data?.length ?? 0) > 0;
}

/**
 * Save a QR code scan for a user
 */
async function saveScan(userId: string, qrCodeId: string): Promise<UserQrScan | null> {
  // Return null if feature is disabled
  if (!featureFlags.qrCodeHunt) {
    console.log('QR Hunt feature is disabled');
    return null;
  }

  // Check if already scanned
  const alreadyScanned = await hasUserScanned(userId, qrCodeId);
  if (alreadyScanned) {
    console.log('QR code already scanned by user');
    return null;
  }

  try {
    const { data, error } = await supabaseBrowser
      .from('user_qr_scans')
      .insert({
        user_id: userId,
        qr_code_id: qrCodeId,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving scan:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('QR Hunt feature not available:', err);
    return null;
  }
}

/**
 * Get user's progress (scanned count and total)
 */
async function getUserProgress(userId: string): Promise<{
  scanned: number;
  total: number;
  percentage: number;
  scannedIds: string[];
}> {
  const [scans, allQrCodes] = await Promise.all([
    getUserScans(userId),
    getAllQrCodes(),
  ]);

  const scannedIds = scans.map(scan => scan.qr_code_id);
  const scanned = scannedIds.length;
  const total = allQrCodes.length;
  const percentage = total > 0 ? Math.round((scanned / total) * 100) : 0;

  return {
    scanned,
    total,
    percentage,
    scannedIds,
  };
}

/**
 * Get unscanned QR codes for a user
 */
async function getUnscannedQrCodes(userId: string): Promise<QrCode[]> {
  const [scans, allQrCodes] = await Promise.all([
    getUserScans(userId),
    getAllQrCodes(),
  ]);

  const scannedIds = new Set(scans.map(scan => scan.qr_code_id));
  return allQrCodes.filter(qr => !scannedIds.has(qr.id));
}

// ============================================================================
// EXPORT SERVICE OBJECT
// ============================================================================

export const qrService = {
  // QR code operations
  getAllQrCodes,
  getQrCodeById,
  validateQrCode,
  
  // User scan operations
  getUserScans,
  hasUserScanned,
  saveScan,
  getUserProgress,
  getUnscannedQrCodes,
};

// Export individual functions for tree-shaking
export {
  getAllQrCodes,
  getQrCodeById,
  validateQrCode,
  getUserScans,
  hasUserScanned,
  saveScan,
  getUserProgress,
  getUnscannedQrCodes,
};
