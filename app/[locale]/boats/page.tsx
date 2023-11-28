import { getBoats } from "@/actions/get-boats";
import { Boat } from "@prisma/client";
import { BoatsClient } from "./components/BoatsClient";

export default async function Boats() {
  const boats = await getBoats();

  return (
    <main className="flex flex-col items-center justify-between">
      <BoatsClient boats={boats as Boat[]}/>
    </main>
  );
}
