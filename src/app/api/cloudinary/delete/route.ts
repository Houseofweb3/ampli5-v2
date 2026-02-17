import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:
    process.env.CLOUDINARY_SECRETE ||
    process.env.CLOUDINARY_API_SECRET ||
    process.env.CLOUDINARY_SECRET,
});

export async function POST(request: Request) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json({ message: "Public ID is required" }, { status: 400 });
    }

    // Delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      return NextResponse.json({ message: "Image deleted successfully", result }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Failed to delete image", result }, { status: 400 });
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return NextResponse.json({ message: "Error deleting image from Cloudinary" }, { status: 500 });
  }
}
