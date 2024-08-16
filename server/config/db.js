import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI; // Replace with your MongoDB URI


export default function connectToDatabase() {
    mongoose.connect(mongoURI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));
}