
import prismadb from "@/lib/prismadb";
import { handler } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export const getColors = async () => {
const session = await getServerSession(handler);

  if (!session) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  try {
    const colors = await prismadb.color.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return colors;
  } catch (error) {
    console.log("[COLORS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};