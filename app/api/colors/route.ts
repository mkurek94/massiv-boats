import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { handler } from "../auth/[...nextauth]/route";
import { ColorFormValues } from "@/app/[locale]/colors/[colorId]/components/color-form";

export async function POST(req: Request) {
  const session = await getServerSession(handler);
  try {
    const currentUser = await prisma?.user.findUnique({
      where: {
        email: session?.user?.email as string,
      }
    });

    const body = await req.json();

    const {
      name,
      value
    }: ColorFormValues = body;

    if (!session || !currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        userId: currentUser?.id as string,
      }
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLORS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
