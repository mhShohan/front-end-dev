import { NextRequest } from 'next/server';
import JWT from 'jsonwebtoken';

export const getDateFromToken = (req: NextRequest) => {
  try {
    const token = req.cookies.get('token')?.value || '';
    const decoded = JWT.verify(token, process.env.JWT!);

    return decoded;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
