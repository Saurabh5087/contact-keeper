import mongoose from 'mongoose';
import config from 'config';
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDb Connected');
  } catch (error) {
    console.log(err.message);
    process.exit(1);
  }
}

export default connectDB;