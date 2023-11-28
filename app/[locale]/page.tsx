import { getServerSession } from "next-auth/next"
import { handler } from "../api/auth/[...nextauth]/route"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/constants/routes";

export default async function Home() {
  const session = await getServerSession(handler)
  
  return (
    <main className="flex flex-col items-center justify-between p-24">
      HomePage
    </main>
  )
}
