import {Schema, model} from 'mongoose'

const recipeSchema = new Schema({
    name: String,
    author: String,
    note: String,
    ingredients: {
        type: Array,
        "default": []
    },
    comments: [String]
})

recipeSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Recipe = model('Recipe', recipeSchema)

export default Recipe