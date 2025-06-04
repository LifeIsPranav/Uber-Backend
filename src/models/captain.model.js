import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const captainSchema = new mongoose.Schema({
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
    type: String,
  },

  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },

  vehicle: {
    color: {
      type: String,
      required: true
    },

    plate: {
      type: String,
      required: true,
      unique: true
    }, 

    capacity: {
      type: Number,
      required: true
    }, 

    vehicleType: {
      type: String,
      required: true,
      enum: ['car', 'motorcycle', 'auto']
    }
  },

  location: {
    ltd: {
      type: Number
    },
    lng: {
      type: Number
    }
  }
})






captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
  return token;
}


captainSchema.methods.comparePassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
}


captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
}


const captainModel = mongoose.model("Captain", captainSchema);
export default captainModel;