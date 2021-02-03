import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    userId: Number,
    channelId: Number,
    messageText: String
    // metaObj: {
    //   type: String,
    //   default: {}
    // }
  },
  { timestamps: true }
)

export default mongoose.model('messages', messageSchema)
