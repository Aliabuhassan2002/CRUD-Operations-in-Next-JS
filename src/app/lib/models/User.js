import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
