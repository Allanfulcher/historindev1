import { NextRequest } from "next/server";
import { adminSupabase, jsonOk, jsonServerError, requireAdmin } from "../_utils";

export async function GET(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(req.url);
    const cityFilter = searchParams.get("city");
    const authFilter = searchParams.get("auth");

    const supabase = await adminSupabase();
    
    // Build query
    let query = supabase
      .from("quiz")
      .select(`
        *,
        user_profiles:user_id (
          email,
          name
        )
      `)
      .order("created_at", { ascending: false });

    // Apply filters
    if (cityFilter && cityFilter !== "all") {
      query = query.eq("meta->>city", cityFilter);
    }

    if (authFilter === "authenticated") {
      query = query.not("user_id", "is", null);
    } else if (authFilter === "anonymous") {
      query = query.is("user_id", null);
    }

    const { data, error } = await query;
    if (error) return jsonServerError(error.message);

    // Transform data to include user info
    const results = (data || []).map((item: any) => ({
      ...item,
      user_email: item.user_profiles?.email || null,
      user_name: item.user_profiles?.name || null,
    }));

    // Calculate statistics
    const stats = {
      total: results.length,
      gramado: results.filter((r: any) => r.meta?.city === "gramado").length,
      canela: results.filter((r: any) => r.meta?.city === "canela").length,
      averageScore: results.length > 0
        ? results.reduce((sum: number, r: any) => sum + (r.score || 0), 0) / results.length
        : 0,
      averagePercentage: results.length > 0
        ? results.reduce((sum: number, r: any) => sum + (r.meta?.percentage || 0), 0) / results.length
        : 0,
      withAuth: results.filter((r: any) => r.user_id).length,
      anonymous: results.filter((r: any) => !r.user_id).length,
    };

    return jsonOk({ data: results, stats });
  } catch (error: any) {
    console.error("Error fetching quiz results:", error);
    return jsonServerError(error.message || "Failed to fetch quiz results");
  }
}
