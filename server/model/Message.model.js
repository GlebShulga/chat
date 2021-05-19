/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    userId: String,
    channelId: String,
    messageText: String
    // metaObj: {
    //   type: String,
    //   default: {}
    // }
  },
  { timestamps: true }
)

export default mongoose.model('messages', messageSchema)
