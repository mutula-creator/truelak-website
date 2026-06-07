import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { password } = await request.json();
    if (password === process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
    return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
