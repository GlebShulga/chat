/* eslint-disable no-unused-vars */
import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const channelSchema = new mongoose.Schema(
  {
    creatorId: Number,
    channelTitle: {
      type: String,
      require: true,
      unique: true
    },
    channelDescription: String
  },
  { timestamps: true }
)

export default mongoose.model('channels', channelSchema)
