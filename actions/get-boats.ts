
import prismadb from "@/lib/prismadb";
import { handler } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export const getBoats = async () => {
const session = await getServerSession(handler);

  if (!session) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  try {
    const boats = await prismadb.boat.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return boats;
  } catch (error) {
    console.log("[BOATS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};