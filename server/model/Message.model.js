import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    userId: String,
    channelId: String,
    messageText: String,
    messageTime: String
  },
  { timestamps: true }
)

export default mongoose.model('messages', messageSchema)
