import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { handler } from "../../auth/[...nextauth]/route";
import { ColorFormValues } from "@/app/[locale]/colors/[colorId]/components/color-form";

export async function PATCH(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  const session = await getServerSession(handler);
  try {
    const body = await req.json();

    const {
      name,
      value
    }: ColorFormValues = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    const color = await prismadb.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      }
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { colorId: string } }
) {
  const session = await getServerSession(handler);
  try {
    
    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.colorId) {
      return new NextResponse("Color Id is required", { status: 400 });
    }

    const color = await prismadb.color.deleteMany({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
    _req: Request,
    { params }: { params: { colorId: string } }
  ) {
    const session = await getServerSession(handler);
    try {
      if (!session) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
 
      if (!params.colorId) {
        return new NextResponse("Color Id is required", { status: 400 });
      }
   
      const color = await prismadb.color.findUnique({
        where: {
          id: params.colorId,
        },
      });
  
      return NextResponse.json(color);
    } catch (error) {
      console.log("[COLOR_GET]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
  