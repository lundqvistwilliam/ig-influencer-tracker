import { NextResponse } from "next/server";

export async function GET(req) {
  const cookies = req.cookies;
  const userId = cookies.get('user_id')?.value;
  const userEmail = cookies.get('user_email')?.value;

  if (!userId || !userEmail) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  return NextResponse.json({ userId, userEmail });
}