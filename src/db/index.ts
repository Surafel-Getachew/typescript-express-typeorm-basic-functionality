import mongoose from "mongoose";
import config from "../config";
import { createConnection,} from "typeorm";

export const connectToDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("connected to DB");
  } catch (error) {
    console.log("mongo error", error);
    process.exit(1);
  }
};

export const connectToPg = () => {
  createConnection()
    .then(async (connection) => {
      console.log("db pg connection created");
    })
    .catch((err) => console.log(err));
};
