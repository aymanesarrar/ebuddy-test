import { auth } from "@/lib/firebase/firebaseConfig";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const cookiesStore = await cookies();

  auth.signOut();
  cookiesStore.delete("fb-auth-token");

  return Response.json({ message: "Logged out" }, { status: 200 });
}
