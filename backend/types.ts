import { Request } from 'express'
import { Document, Types } from 'mongoose'

export interface ENV {
  PORT: number | undefined
  MONGODB_URI: string | undefined
}

export interface Config {
  PORT: number
  MONGODB_URI: string
}

export interface IUser extends Document {
  username: string
  passwordHash: string
  name: string
  recipes: Types.ObjectId[]
}

export interface IRecipe extends Document {
  recipeName: string
  addedBy: Types.ObjectId
  instruction: string
  ingredients: []
  rating: number
  comments: []
  personalString: []
}

export interface IRequestWithTokenAndUser extends Request {
  token: string
  user: IUser | null
}

export interface IDecodedToken {
  id: string
}

