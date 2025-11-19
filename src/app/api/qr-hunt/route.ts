import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import type { Database } from '@/types/database.types';

/**
 * GET /api/qr-hunt
 * Get all QR codes or user's progress
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    const supabase = await getSupabaseServerClient<Database>();

    // Get all active QR codes
    const { data: qrCodes, error: qrError } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('active', true)
      .order('rua_id', { ascending: true });

    if (qrError) {
      return NextResponse.json(
        { error: qrError.message },
        { status: 500 }
      );
    }

    // If userId provided, also get user's scans
    if (userId) {
      const { data: scans, error: scansError } = await supabase
        .from('user_qr_scans')
        .select('*')
        .eq('user_id', userId);

      if (scansError) {
        return NextResponse.json(
          { error: scansError.message },
          { status: 500 }
        );
      }

      const scannedIds = scans?.map(scan => scan.qr_code_id) || [];
      const progress = {
        scanned: scannedIds.length,
        total: qrCodes?.length || 0,
        percentage: qrCodes?.length ? Math.round((scannedIds.length / qrCodes.length) * 100) : 0,
        scannedIds,
      };

      return NextResponse.json({
        qrCodes: qrCodes || [],
        scans: scans || [],
        progress,
      });
    }

    return NextResponse.json({ qrCodes: qrCodes || [] });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Unexpected error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/qr-hunt
 * Save a QR code scan
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    const { userId, qrCodeId } = body as {
      userId?: string;
      qrCodeId?: string;
    };

    if (!userId || !qrCodeId) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, qrCodeId' },
        { status: 400 }
      );
    }

    const supabase = await getSupabaseServerClient<Database>();

    // Validate QR code exists and is active
    const { data: qrCode, error: qrError } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('id', qrCodeId)
      .eq('active', true)
      .single();

    if (qrError || !qrCode) {
      return NextResponse.json(
        { error: 'Invalid QR code' },
        { status: 400 }
      );
    }

    // Check if already scanned
    const { data: existingScan } = await supabase
      .from('user_qr_scans')
      .select('id')
      .eq('user_id', userId)
      .eq('qr_code_id', qrCodeId)
      .limit(1);

    if (existingScan && existingScan.length > 0) {
      return NextResponse.json(
        { 
          error: 'QR code already scanned',
          alreadyScanned: true,
        },
        { status: 409 }
      );
    }

    // Save the scan
    const { data: scan, error: scanError } = await supabase
      .from('user_qr_scans')
      .insert({
        user_id: userId,
        qr_code_id: qrCodeId,
      })
      .select()
      .single();

    if (scanError) {
      return NextResponse.json(
        { error: scanError.message },
        { status: 500 }
      );
    }

    // Get updated progress
    const { data: allScans } = await supabase
      .from('user_qr_scans')
      .select('qr_code_id')
      .eq('user_id', userId);

    const { data: allQrCodes } = await supabase
      .from('qr_codes')
      .select('id')
      .eq('active', true);

    const progress = {
      scanned: allScans?.length || 0,
      total: allQrCodes?.length || 0,
      percentage: allQrCodes?.length 
        ? Math.round(((allScans?.length || 0) / allQrCodes.length) * 100) 
        : 0,
    };

    return NextResponse.json({
      scan,
      qrCode,
      progress,
      success: true,
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Unexpected error' },
      { status: 500 }
    );
  }
}
