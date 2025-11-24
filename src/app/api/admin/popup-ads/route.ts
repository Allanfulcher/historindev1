import { NextRequest } from "next/server";
import { adminSupabase, jsonOk, jsonServerError, requireAdmin, jsonBadRequest } from "../_utils";

export async function GET(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const supabase = await adminSupabase();
    const { data, error } = await supabase
      .from("popup_ads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return jsonServerError(error.message);
    return jsonOk({ data: data || [] });
  } catch (error: any) {
    console.error("Error fetching popup ads:", error);
    return jsonServerError(error.message || "Failed to fetch popup ads");
  }
}

export async function POST(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const body = await req.json();
    
    // Validate required fields
    if (!body.title || !body.description || !body.question || !body.business_name || !body.street_ids?.length) {
      return jsonBadRequest("Missing required fields");
    }
    
    // Validate answers
    if (!Array.isArray(body.answers) || body.answers.length < 2) {
      return jsonBadRequest("At least 2 answer options are required");
    }
    
    // Filter out empty answers
    body.answers = body.answers.filter((a: string) => a && a.trim().length > 0);

    const supabase = await adminSupabase();
    const { data, error } = await supabase
      .from("popup_ads")
      .insert([body])
      .select()
      .single();

    if (error) return jsonServerError(error.message);
    return jsonOk({ data });
  } catch (error: any) {
    console.error("Error creating popup ad:", error);
    return jsonServerError(error.message || "Failed to create popup ad");
  }
}
