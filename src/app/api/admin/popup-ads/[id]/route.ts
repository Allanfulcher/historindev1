import { NextRequest } from "next/server";
import { adminSupabase, jsonOk, jsonServerError, requireAdmin, jsonBadRequest } from "../../_utils";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
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
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) return jsonServerError(error.message);
    return jsonOk({ data });
  } catch (error: any) {
    console.error("Error updating popup ad:", error);
    return jsonServerError(error.message || "Failed to update popup ad");
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;

    const supabase = await adminSupabase();
    const { error } = await supabase
      .from("popup_ads")
      .delete()
      .eq("id", id);

    if (error) return jsonServerError(error.message);
    return jsonOk({ success: true });
  } catch (error: any) {
    console.error("Error deleting popup ad:", error);
    return jsonServerError(error.message || "Failed to delete popup ad");
  }
}
