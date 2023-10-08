import express from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/user'
import Recipe from '../models/recipe'

import { IDecodedToken, IRequestWithTokenAndUser } from '../types'

const recipesRouter = express.Router()

// const getTokenFrom = (req: express.Request) => {
//   const authorization = req.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return ''
// }

recipesRouter.get('/', async (req, res) => {
  const recipes = await Recipe.find({}).populate('addedBy', {
    username: 1,
    name: 1,
  })

  res.json(recipes)
})

recipesRouter.get('/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id).populate('addedBy', {
    username: 1,
    name: 1,
  })

  recipe
    ? res.json(recipe)
    : res.status(404).json({ error: 'recipeNotFound' }).end()
})

// ts doesn't know about 'id' in decodedToken, so we define it

recipesRouter.post('/', async (req, res) => {
  const decodedToken = jwt.verify(
    req.token,
    process.env.SECRET!
  ) as IDecodedToken

  if (!decodedToken)
    return res.status(401).json({ error: 'unauthorized' }).end()

  const body = req.body
  if (!body.recipeName || !body.ingredients)
    return res.status(400).json({ error: 'noRecipeOrIngredients' }).end()

  const user = await User.findById(decodedToken.id)
  if (!user) return res.status(401).json({ error: 'unauthorized' }).end()

  const recipe = new Recipe({
    recipeName: body.recipeName,
    ingredients: [...body.ingredients],
    addedBy: user!.id,
    instructions: '',
    rating: 0,
    comments: [],
    personalNote: '',
  })

  const savedRecipe = await recipe.save()
  user.recipes = user.recipes.concat(savedRecipe.id)

  await user!.save()
  res.status(201).json(savedRecipe)
})

recipesRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET!)

  if (!decodedToken)
    return res.status(401).json({ error: 'unauthorized' }).end()
})

export default recipesRouter

