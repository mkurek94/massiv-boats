import prismadb from "@/lib/prismadb";
import React from "react";
import { BoatForm } from "./components/boat-form";

const BoatPage = async ({ params }: { params: { boatId: string } }) => {
  const boat =
    params.boatId === "new"
      ? null
      : await prismadb.boat.findUnique({
          where: {
            id: params.boatId,
          }
        });

  const producers = await prismadb.producer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const colors = await prismadb.color.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BoatForm initialData={boat} producers={producers} colors={colors}/>
      </div>
    </div>
  );
};

export default BoatPage;
