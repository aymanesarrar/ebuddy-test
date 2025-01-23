import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookiesStore = await cookies();

  const tokenId = cookiesStore.get("fb-auth-token")?.value;

  return Response.json({ tokenId }, { status: 200 });
}
