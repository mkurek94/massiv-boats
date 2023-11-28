import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { handler } from "../../auth/[...nextauth]/route";
import { BoatFormValues } from "@/app/[locale]/boats/[boatId]/components/boat-form";

export async function PATCH(
  req: Request,
  { params }: { params: { boatId: string } }
) {
  const session = await getServerSession(handler);
  try {
    const body: BoatFormValues = await req.json();

    const {
      images,
      name,
      description,
      mass,
      height,
      width,
      colors,
      length,
      price,
      producerId
    } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!mass) {
      return new NextResponse("Mass is required", { status: 400 });
    }

    if (!height) {
      return new NextResponse("Height is required", { status: 400 });
    }

    if (!width) {
      return new NextResponse("Width is required", { status: 400 });
    }

    if (!length) {
      return new NextResponse("Length is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!colors || !colors.length) {
      return new NextResponse("Colors are required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    const producer = await prisma?.producer.findUnique({
      where: {
        id: producerId,
      }
    });

    const boat = await prismadb.boat.updateMany({
      where: {
        id: params.boatId,
      },
      data: {
        name,
        images: images as any,
        description,
        mass,
        length,
        width,
        height,
        price,
        producerId: producer?.id as string,
      }
    });

    return NextResponse.json(boat);
  } catch (error) {
    console.log("[BOAT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { boatId: string } }
) {
  const session = await getServerSession(handler);
  try {
    
    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.boatId) {
      return new NextResponse("Boat Id is required", { status: 400 });
    }

    const producer = await prismadb.boat.deleteMany({
      where: {
        id: params.boatId,
      },
    });

    return NextResponse.json(producer);
  } catch (error) {
    console.log("[BOAT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
    _req: Request,
    { params }: { params: { boatId: string } }
  ) {
    const session = await getServerSession(handler);
    try {
      if (!session) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
 
      if (!params.boatId) {
        return new NextResponse("Boat Id is required", { status: 400 });
      }
   
      const boat = await prismadb.boat.findUnique({
        where: {
          id: params.boatId,
        },
      });
  
      return NextResponse.json(boat);
    } catch (error) {
      console.log("[BOAT_GET]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
  