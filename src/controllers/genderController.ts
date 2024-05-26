import { Request, Response } from 'express'
import categoryService from '../services/categoryService'
import HttpError from '../utils/HttpError'

const getAllGenders = async (req: Request, res: Response) => {
  res.send(await categoryService.getAllGenders())
}

const getAllProductsByGenderId = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id, 10)
    if (isNaN(id)) {
      console.error('Invalid gender ID:', req.params.id)
      return res.status(400).send({ error: 'Invalid gender ID' })
    }
    const products = await categoryService.getAllProductsByGenderId(id)
    res.send(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    if (error instanceof HttpError) {
      res.status(error.statusCode).send({ error: error.message })
    } else {
      res.status(500).send({ error: 'An unexpected error occurred' })
    }
  }
}

export { getAllProductsByGenderId, getAllGenders }
