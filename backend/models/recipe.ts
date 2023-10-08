import { Schema, model } from 'mongoose'

import { IRecipe } from '../types'

const recipeSchema = new Schema({
  recipeName: String,
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  instruction: String,
  ingredients: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      unit: { type: String, required: true },
    },
  ],
  rating: Number,
  comments: [String],
  personalNote: String,
})

recipeSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Recipe = model<IRecipe>('Recipe', recipeSchema)

export default Recipe

/**
 * Every recipe posted needs recipeName and ingredients (instruction can be omitted)
 */

