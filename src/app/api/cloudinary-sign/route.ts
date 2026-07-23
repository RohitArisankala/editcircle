import { NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * Returns a short-lived signature so the browser can upload directly to
 * Cloudinary WITHOUT ever seeing the API secret. Only a signed-in admin
 * (when Supabase is configured) may request one.
 */
export async function POST() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary is not configured on the server." },
      { status: 500 }
    );
  }

  // Gate signature requests to the authenticated admin.
  const supabase = await getSupabaseServerClient();
  if (supabase) {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
  }

  const timestamp = Math.round(Date.now() / 1000);
  const folder = "edit-circle";

  // Sign the params alphabetically (folder, timestamp) with the secret.
  const toSign = `folder=${folder}&timestamp=${timestamp}`;
  const signature = crypto
    .createHash("sha1")
    .update(toSign + apiSecret)
    .digest("hex");

  return NextResponse.json({ signature, timestamp, apiKey, cloudName, folder });
}
