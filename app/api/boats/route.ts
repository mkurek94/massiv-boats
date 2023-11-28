import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { handler } from "../auth/[...nextauth]/route";
import { BoatFormValues } from "@/app/[locale]/boats/[boatId]/components/boat-form";

export async function POST(req: Request) {
  const session = await getServerSession(handler);
  try {
    const currentUser = await prisma?.user.findUnique({
      where: {
        email: session?.user?.email as string,
      }
    });

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
      producer
    } = body;

    if (!session || !currentUser) {
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

    const boat = await prismadb.boat.create({
      data: {
        name,
        images: images as any,
        description,
        mass,
        length,
        width,
        height,
        price,
        producer: producer,
        userId: currentUser?.id as string,
      }
    });

    return NextResponse.json(boat);
  } catch (error) {
    console.log("[PRODUCERS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

