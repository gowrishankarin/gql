import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});

export default model("User", UserSchema);
