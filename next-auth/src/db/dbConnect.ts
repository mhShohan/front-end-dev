import mongoose from 'mongoose';

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('Database connected!');
    });

    connection.on('error', () => {
      console.log('DB connection failed');
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
};
