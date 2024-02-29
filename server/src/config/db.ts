import mongoose from "mongoose";
import { MongoClient } from "mongodb";

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

export const mongoConnect = async () => {
  const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  };

  try {
    const client = new MongoClient(process.env.MONGO_URI)
    const connection: MongoClient = await client.connect();

    console.log(
      `Pinged your deployment. You successfully connected to MongoDB! at ${client.s.url}`
    );
    return client;
  } catch (err) {
    console.log("MongoDB Connection Error: " + err);
  } finally {
    // Ensures that the client will close when you finish/error
    // console.log("Pinged your deployment. You failed to connect to MongoDB!");
    // await mongoose.disconnect();
  }
};

export const mongoDisconnect = async () => {
  await mongoose.disconnect();
};
