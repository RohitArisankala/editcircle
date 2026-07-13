"use client";

/**
 * Cloudinary browser uploads via an UNSIGNED upload preset.
 * No server/secret needed — the browser posts straight to Cloudinary.
 * Configure NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME + NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.
 */

export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";
export const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "";

export const isCloudinaryConfigured =
  CLOUDINARY_CLOUD_NAME.length > 0 && CLOUDINARY_UPLOAD_PRESET.length > 0;

export interface CloudinaryResult {
  url: string;
  publicId: string;
  resourceType: string;
}

type ResourceType = "video" | "image" | "auto";

/** Uploads a file to Cloudinary, reporting progress (0–100). */
export function uploadToCloudinary(
  file: File,
  resourceType: ResourceType,
  onProgress?: (pct: number) => void
): Promise<CloudinaryResult> {
  if (!isCloudinaryConfigured) {
    return Promise.reject(
      new Error(
        "Cloudinary isn't configured. Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to .env.local."
      )
    );
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  form.append("folder", "edit-circle");

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint);

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
  // Insert a start-offset transform and swap the extension to .jpg.
  return url
    .replace("/video/upload/", "/video/upload/so_0/")
    .replace(/\.(mp4|mov|webm|mkv|avi)$/i, ".jpg");
}
