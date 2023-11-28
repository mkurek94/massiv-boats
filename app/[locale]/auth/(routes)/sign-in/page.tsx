import { handler } from "@/app/api/auth/[...nextauth]/route";
import { LoginForm } from "@/components/auth/login-form/LoginForm";
import { getServerSession } from "next-auth/next";

export default async function Page() {
  const session = await getServerSession(handler);
  return <LoginForm isLoggedIn={!!session} />;
}
