import mongoose from 'mongoose'

const channelSchema = new mongoose.Schema(
  {
    channelTitle: {
      type: String,
      require: true,
      unique: true
    },
    channelDescription: String,
    creatorId: String
  },
  { timestamps: true }
)

export default mongoose.model('channels', channelSchema)
