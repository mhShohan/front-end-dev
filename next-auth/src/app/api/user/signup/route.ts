import { connect } from '@/db/dbConnect';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

connect();

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    //check user exist or not
    const userWithEmail = await User.findOne({ email });
    if (userWithEmail) {
      return NextResponse.json({
        code: 409,
        status: 'failed',
        error: 'User Already Exist with this email!',
      });
    }

    const userWithUsername = await User.findOne({ username });
    if (userWithUsername) {
      return NextResponse.json({
        code: 409,
        status: 'failed',
        error: 'User Already Exist with this username!',
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ code: 201, status: 'success', data: newUser });
  } catch (error: any) {
    return NextResponse.json({ code: 500, status: 'failed', error: error.message });
  }
}
