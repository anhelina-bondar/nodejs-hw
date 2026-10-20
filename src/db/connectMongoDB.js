import mongoose from 'mongoose';
// export async function connectToMongoDB() {
//   try {
//     await mongoose.connect(
//       'mongodb+srv://angelina072017_db_user:bI0L5FYwGYKdAKBp@cluster0.gf70ib5.mongodb.net/',
//     );
//     console.log('You successfully connected to MongoDB!');
//     return mongoose;
//   } catch (err) {
//     console.dir(err);
//   }
// }
// // Call this only when your application terminates
// export async function disconnectFromMongoDB() {
//   await mongoose.connection.close();
// }
// src/db/connectMongoDB.js

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1); // аварійне завершення програми
  }
};
