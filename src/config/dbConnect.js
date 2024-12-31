import mongoose from "mongoose";

async function conectaDataBase() {
    mongoose.connect(process.env.DB_CONNECTION_STRING);

    return mongoose.connection;
};

export default conectaDataBase;