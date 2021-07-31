import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const SALT_WORK_FACTOR = 10

const userSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      require: true,
      unique: true
    },
    role: {
      type: [String],
      default: ['user']
    },
    password: {
      type: String,
      require: true
    },
    hashtag: String,
    subscriptionOnChannels: {
      type: [String],
      default: []
    },
    avatar: String
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
  this.password = await bcrypt.hash(this.password, salt)

  return next()
})

userSchema.method({
  passwordMatches(password) {
    return bcrypt.compare(password, this.password)
  }
})

userSchema.statics = {
  async findAndValidateUser({ login, password }) {
    if (!login) {
      throw new Error('No Login')
    }
    if (!password) {
      throw new Error('No Password')
    }

    const user = await this.findOne({ login }).exec()
    if (!user) {
      throw new Error('No User')
    }

    const isPasswordOk = await user.passwordMatches(password)

    if (!isPasswordOk) {
      throw new Error('PasswordIncorrect')
    }

    return user
  }
}

export default mongoose.model('users', userSchema)
