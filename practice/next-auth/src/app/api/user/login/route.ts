import { connect } from '@/db/dbConnect';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    // check user is exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ code: 404, status: 'failed', error: 'User not found!' });
    }
    // check the password is correct or  NextResponse
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ code: 401, status: 'failed', error: 'Wrong Credentials!' });
    }

    //generate token
    const tokenPayload = { _id: user._id, username: user.username, email: user.email };
    const token = await jwt.sign(tokenPayload, process.env.JWT!, { expiresIn: '1h' });

    const response = NextResponse.json({
      code: 203,
      status: 'success',
      data: { _id: user._id, username: user.username, email: user.email },
    });
    response.cookies.set('token', token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ code: 500, status: 'failed', error: error.message });
  }
};
