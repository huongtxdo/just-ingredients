import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

import { IUser } from '../types'

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    minLength: 6,
  },
  passwordHash: {
    type: String,
    require: true,
  },
  name: { type: String, required: true },
  recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Recipe',
    },
  ],
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

userSchema.plugin(uniqueValidator)

const User = model<IUser>('User', userSchema)

export default User

