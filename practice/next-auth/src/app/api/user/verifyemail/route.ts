import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/db/dbConnect';
import User from '@/models/User';

connect();

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    console.log(token);
    const user: any = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { code: 404, status: 'failed', error: 'Invalid Token' },
        { status: 404 }
      );
    }
    // console.log(user);
    user.isVerified = true;
    user.verifyToken = null;
    user.verifyTokenExpiry = null;
    await user.save();

    return NextResponse.json(
      { code: 200, status: 'success', message: 'Email Verified!' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { code: 500, status: 'failed', error: error.message },
      { status: 500 }
    );
  }
}
