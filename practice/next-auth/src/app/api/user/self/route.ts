import { getDateFromToken } from '@/helper/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import { connect } from '@/db/dbConnect';

connect();

export async function GET(req: NextRequest) {
  try {
    const decoded: any = getDateFromToken(req);
    const user = await User.findById(decoded._id).select('-password');

    return NextResponse.json({ code: 200, status: 'success', data: user });
  } catch (error: any) {
    return NextResponse.json({ code: 400, error: error.message });
  }
}
