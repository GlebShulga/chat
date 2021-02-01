/* eslint-disable no-unused-vars */
import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const messageSchema = new mongoose.Schema(
  {
    userId: Number,
    channelId: Number,
    text: String,
    messageId: Number,
    // createdAt: Number,
    metaObj: Object
  },
  { timestamp: true }
)

messageSchema.pre('save', async function (next) {
  // if (!this.isModified('password')) {
  //   return next()
  // }

  // this.password = bcrypt.hashSync(this.password)

  return next()
})

// messageSchema.method({
//   passwordMatches(password) {
//     console.log(bcrypt.hashSync(password), this.password)
//     return bcrypt.compareSync(password, this.password)
//   }
// })

// messageSchema.statics = {
//   async findAndValidateUser({ text }) {
//     if (!text) {
//       throw new Error('Empty message')
//     }

//     const message = await this.findOne({ text }).exec()
//     if (!message) {
//       throw new Error('Empty message')
//     }

//     return message
//   }
// }

export default mongoose.model('messages', messageSchema)
