import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = NextResponse.json({
      code: 200,
      status: 'Success',
      message: 'Logout Successfully',
    });

    response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error: any) {
    return NextResponse.json({ code: 500, error: error.message });
  }
}
