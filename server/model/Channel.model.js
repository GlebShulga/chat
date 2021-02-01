/* eslint-disable no-unused-vars */
import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const channelSchema = new mongoose.Schema(
  {
    creatorId: Number,
    channelId: Number,
    chanelTitle: String,
    channelDescription: String
  },
  { timestamp: true }
)

channelSchema.pre('save', async function (next) {
  // if (!this.isModified('password')) {
  //   return next()
  // }

  // this.password = bcrypt.hashSync(this.password)

  return next()
})

// channelSchema.method({
//   passwordMatches(password) {
//     console.log(bcrypt.hashSync(password), this.password)
//     return bcrypt.compareSync(password, this.password)
//   }
// })

// channelSchema.statics = {
//   async findAndValidateUser({ channelTitle, channelDescription }) {
//     if (!channelTitle) {
//       throw new Error('Empty Title')
//     }
//     if (!channelDescription) {
//       throw new Error('Empty Decription')
//     }

//     const channel = await this.findOne({ channelTitle }).exec()
//     if (!channel) {
//       throw new Error('No Title')
//     }

//     return channel
//   }
// }

export default mongoose.model('channels', channelSchema)
