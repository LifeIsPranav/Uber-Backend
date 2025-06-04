import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minLength: 3
    },
    lastname: {
      type: String,
      minLength: 3
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  socketId: {
    type: String
  }

})




userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
  return token;
}


userSchema.methods.comparePassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
}


userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
}


const userModel = mongoose.model("User", userSchema);
export default userModel;