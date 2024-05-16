import { Request, Response } from 'express'
import categoryService from '../services/categoryService'

const getAllCategories = async (req: Request, res: Response) => {
  res.send(await categoryService.getAllCategories())
}

const getAllProductsByCategoryId = async (req: Request, res: Response) => {
  res.send(
    await categoryService.getAllProductsByCategoryId(
      Number.parseInt(req.params.id, 10),
    ),
  )
}

const deleteCategoryById = async (req: Request, res: Response) => {
  res.send(
    await categoryService.deleteCategoryById(
      Number.parseInt(req.params.id, 10),
    ),
  )
}

export { deleteCategoryById, getAllProductsByCategoryId, getAllCategories }
