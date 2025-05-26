import mongoose from 'mongoose';

const uri = process.env.NEXT_PUBLIC_MONGODB_URI || 'mongodb://localhost:27017/weedwatcher';

// Check if MongoDB URI is defined
if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

// Configure mongoose
mongoose.set('strictQuery', false);

// Connection function
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, db: null };
}

async function dbConnect() {
  if (cached.conn) {
    return { mongoose: cached.conn, db: cached.db };
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      // Store the native db connection for direct access to collections
      cached.db = mongoose.connection.db;
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB connection error:', error);
      cached.promise = null;
      throw error;
    });
  }
  
  try {
    cached.conn = await cached.promise;
    // Make sure db is available
    cached.db = cached.conn.connection.db;
    return { mongoose: cached.conn, db: cached.db };
  } catch (error) {
    throw new Error('Failed to connect to MongoDB');
  }
}

// Helper function to get a specific model
function getModel(modelName, schema) {
  dbConnect();
  return mongoose.models[modelName] || mongoose.model(modelName, schema);
}

export { dbConnect, getModel };
export default dbConnect;