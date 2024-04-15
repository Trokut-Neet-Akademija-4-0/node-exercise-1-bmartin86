import { Request, Response } from 'express'
import productService from '../services/productService'

const getAllProducts = (req: Request, res: Response) => {
  res.send(productService.getAllProducts())
}

const getProductById = (req: Request, res: Response) => {
  res.send(productService.getProductById(Number.parseInt(req.params.id, 10)))
}

export { getAllProducts, getProductById }
