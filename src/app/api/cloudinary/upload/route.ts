import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary SDK requires Node.js runtime (not Edge)
export const runtime = "nodejs";

// Configure API route timeout (300 seconds = 5 minutes)
export const maxDuration = 300;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret =
  process.env.CLOUDINARY_SECRETE ||
  process.env.CLOUDINARY_API_SECRET ||
  process.env.CLOUDINARY_SECRET;
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:
    process.env.CLOUDINARY_SECRETE ||
    process.env.CLOUDINARY_API_SECRET ||
    process.env.CLOUDINARY_SECRET,
  timeout: 120000, // 120 seconds (2 minutes) for Cloudinary API calls
});

export async function POST(request: Request) {
  try {
    // Fail fast on missing Cloudinary env in production

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        {
          message: "Server configuration error: Cloudinary environment variables are missing.",
          missing: {
            CLOUDINARY_CLOUD_NAME: !cloudName,
            CLOUDINARY_API_KEY: !apiKey,
            CLOUDINARY_API_SECRET: !apiSecret,
            cloudName,
            apiKey,
            apiSecret,
          },
          error: "CLOUDINARY_CONFIG_MISSING",
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    // Validate file type on server side
    const allowedImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/bmp",
      "image/svg+xml",
    ];
    if (!file.type.startsWith("image/") || !allowedImageTypes.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        { message: "Only image files are allowed (JPG, PNG, GIF, WebP, BMP, or SVG)" },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ message: "File size must be less than 10MB" }, { status: 400 });
    }

    // Convert File to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // For files larger than 5MB, use upload_stream for better performance
    // For smaller files, use base64 upload
    const useStream = file.size > 5 * 1024 * 1024; // 5MB threshold

    let result: { secure_url: string; public_id: string };

    if (useStream) {
      // Use upload_stream for large files (more efficient for large files)
      result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "creator-onboarding",
            resource_type: "image",
            timeout: 120000, // 2 minutes for large files
          },
          (error, uploadResult) => {
            if (error) {
              reject(error);
            } else if (uploadResult) {
              resolve({
                secure_url: uploadResult.secure_url,
                public_id: uploadResult.public_id,
              });
            } else {
              reject(new Error("Upload failed: No result returned"));
            }
          }
        );

        uploadStream.end(buffer);
      });
    } else {
      // Use base64 for smaller files (simpler and faster for small files)
      const base64 = buffer.toString("base64");
      const dataURI = `data:${file.type};base64,${base64}`;

      const uploadResult = (await cloudinary.uploader.upload(dataURI, {
        folder: "creator-onboarding",
        resource_type: "image",
        timeout: 120000, // 2 minutes timeout
      })) as { secure_url: string; public_id: string };

      result = {
        secure_url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    }

    return NextResponse.json(
      {
        url: result.secure_url,
        publicId: result.public_id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error uploading image to Cloudinary:", error);

    // Handle timeout errors specifically
    if (
      error?.http_code === 499 ||
      error?.name === "TimeoutError" ||
      error?.message?.includes("timeout")
    ) {
      return NextResponse.json(
        {
          message:
            "Upload timeout. The image may be too large or the connection is slow. Please try again with a smaller image or check your internet connection.",
          error: "TIMEOUT",
        },
        { status: 408 }
      );
    }

    // Handle other Cloudinary errors
    if (error?.http_code) {
      return NextResponse.json(
        {
          message: `Upload failed: ${error?.error?.message || error.message || "Unknown error"}`,
          error: error.name || "UPLOAD_ERROR",
        },
        { status: error.http_code || 500 }
      );
    }

    // Cloudinary sometimes nests useful details under `error.error`
    const nestedMessage =
      error?.error?.message ||
      error?.cause?.message ||
      (typeof error === "string" ? error : undefined);

    return NextResponse.json(
      {
        message: nestedMessage || "Error uploading image to Cloudinary. Please try again.",
        error: "UPLOAD_ERROR",
      },
      { status: 500 }
    );
  }
}
