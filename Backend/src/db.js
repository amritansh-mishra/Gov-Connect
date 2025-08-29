import mongoose from 'mongoose';

export async function connectDb(uri) {
  const url = new URL(uri);
  const dbName = url.pathname?.slice(1) || undefined;
  await mongoose.connect(uri, { dbName });
}


