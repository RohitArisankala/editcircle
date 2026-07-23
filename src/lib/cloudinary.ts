"use client";

/**
 * Cloudinary browser uploads using a SIGNED flow.
 * The browser asks our /api/cloudinary-sign route for a short-lived signature
 * (the API secret never leaves the server), then uploads the file directly to
 * Cloudinary. Only NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is exposed to the client.
 */

export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";

export const isCloudinaryConfigured = CLOUDINARY_CLOUD_NAME.length > 0;

export interface CloudinaryResult {
  url: string;
  publicId: string;
  resourceType: string;
}

type ResourceType = "video" | "image" | "auto";

export async function uploadToCloudinary(
  file: File,
  resourceType: ResourceType,
  onProgress?: (pct: number) => void
): Promise<CloudinaryResult> {
  if (!isCloudinaryConfigured) {
    throw new Error(
      "Cloudinary isn't configured. Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME to .env.local."
    );
  }

  // 1) Get a signature from our server (keeps the API secret server-side).
  const signRes = await fetch("/api/cloudinary-sign", { method: "POST" });
  if (!signRes.ok) {
    if (signRes.status === 401)
      throw new Error("Please sign in as admin before uploading.");
    throw new Error(
      "Cloudinary isn't set up on the server — check CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET in .env.local."
    );
  }
  const { signature, timestamp, apiKey, cloudName, folder } =
    await signRes.json();

  // 2) Upload the file straight to Cloudinary with the signature.
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append("file", file);
    form.append("api_key", apiKey);
    form.append("timestamp", String(timestamp));
    form.append("signature", signature);
    form.append("folder", folder);

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`
    );

    xhr.upload.onprogress = (e) => {
      if (onProgress && e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      try {
        const res = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && res.secure_url) {
          resolve({
            url: res.secure_url as string,
            publicId: res.public_id as string,
            resourceType: res.resource_type as string,
          });
        } else {
          reject(
            new Error(res?.error?.message || `Upload failed (${xhr.status}).`)
          );
        }
      } catch {
        reject(new Error("Unexpected response from Cloudinary."));
      }
    };

    xhr.onerror = () => reject(new Error("Network error during upload."));
    xhr.send(form);
  });
}

export const uploadCloudinaryVideo = (
  file: File,
  onProgress?: (p: number) => void
) => uploadToCloudinary(file, "video", onProgress);

export const uploadCloudinaryImage = (
  file: File,
  onProgress?: (p: number) => void
) => uploadToCloudinary(file, "image", onProgress);

/**
 * Derives a JPG poster from a Cloudinary VIDEO url (first frame).
 * Returns null if the url isn't a Cloudinary video upload url.
 */
export function cloudinaryVideoPoster(url: string): string | null {
  if (!url.includes("res.cloudinary.com") || !url.includes("/video/upload/")) {
    return null;
  }
  return url
    .replace("/video/upload/", "/video/upload/so_0/")
    .replace(/\.(mp4|mov|webm|mkv|avi)$/i, ".jpg");
}
