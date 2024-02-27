import mongoose from "mongoose";

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
    const conn = await mongoose.connect(process.env.MONGO_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      `Pinged your deployment. You successfully connected to MongoDB! at `
    );
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
