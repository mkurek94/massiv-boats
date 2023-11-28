import { getColors } from "@/actions/get-colors";
import { Color } from "@prisma/client";
import { ColorsClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { ColorColumn } from "./components/columns";
import { format } from "date-fns";

export default async function Boats() {
  const colors = await prismadb.color.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <main className="flex flex-col items-center justify-between">
      <ColorsClient data={formattedColors} />
    </main>
  );
}
