import { NextRequest, NextResponse } from "next/server";
import dbConnect from "kodebloxui/services/dbConnect";
import Blog from "kodebloxui/models/Blog";
import { generateCustomUUID } from "kodebloxui/utils";
import tokenValidator from "kodebloxui/utils/tokenValidator";
import { updatePostActivity } from "../_helpers";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const id = req.nextUrl.searchParams.get("id");

    if (id) {
      const blog = await Blog.findById(id);
      if (!blog) {
        return NextResponse.json(
          { success: false, error: "blog not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: true, data: blog },
        {
          status: 200,
          headers: {
            "Cache-Control": "public, s-maxage=1, stale-while-revalidate=59",
            "CDN-Cache-Control":
              "public, s-maxage=1, stale-while-revalidate=59",
            "Vercel-CDN-Cache-Control":
              "public, s-maxage=1, stale-while-revalidate=59",
          },
        }
      );
    } else {
      const blogs = await Blog.find({});
      return NextResponse.json(
        { success: true, data: blogs },
        {
          status: 200,
          headers: {
            "Cache-Control": "public, s-maxage=1, stale-while-revalidate=59",
            "CDN-Cache-Control":
              "public, s-maxage=1, stale-while-revalidate=59",
            "Vercel-CDN-Cache-Control":
              "public, s-maxage=1, stale-while-revalidate=59",
          },
        }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Unknown error" },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { _id } = await tokenValidator(req);
    const body = await req.json();
    const customId = generateCustomUUID(10);
    const blogData = {
      customId,
      ...body,
    };
    const blog: Record<string, any> = await Blog.create(blogData);
    updatePostActivity(_id, "blog_ids", blog?._id);
    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Unknown error" },
      { status: 400 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }
    const body = await req.json();
    const blog = await Blog.findByIdAndUpdate(id, body, { new: true });
    if (!blog) {
      return NextResponse.json(
        { success: false, error: "blog not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Unknown error" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, error: "blog not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Unknown error" },
      { status: 400 }
    );
  }
}
