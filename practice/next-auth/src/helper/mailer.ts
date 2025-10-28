import User from '@/models/User';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create hashed token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 60000000,
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 60000000,
      });
    }
    var transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '71e033ff1f4315',
        pass: 'd7fd76a293656a',
      },
    });

    const mailOptions = {
      from: 'mshohanhasan@gmail.com',
      to: email,
      subject: emailType === 'VERIFY' ? 'verify your email' : 'reset your password',
      html: `
        <p><p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to ${
        emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
      }</p>
          <br/>
          ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
          </p>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
