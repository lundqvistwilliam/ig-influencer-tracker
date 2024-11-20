import { getCurrentUser } from "@/lib/actions";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const user = await getCurrentUser();
    console.log("USER:", user);

    if (!user) {
      console.log("No user found");
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.log("Error fetching user:", error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
