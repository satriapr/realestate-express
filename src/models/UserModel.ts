import { IUser } from '../types/UserType'
import { model, Schema } from 'mongoose'

const userSchema: Schema = new Schema<IUser>(
  {
    fullName: String,
    facebookId: String,
    role: String,
    email: String,
    password: String,
    mobilePhone: String,
    active: Number,
  },
  { collection: 'user', timestamps: true }
)
userSchema.index({ name: 1 })

export default model<IUser>('User', userSchema)
