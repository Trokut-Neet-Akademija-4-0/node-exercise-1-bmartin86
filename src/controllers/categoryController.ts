import { Request, Response } from 'express'
import categoryService from '../services/categoryService'

const deleteCategoryById = async (req: Request, res: Response) => {
  res.send(
    await categoryService.deleteCategoryById(
      Number.parseInt(req.params.id, 10),
    ),
  )
}

export { deleteCategoryById }
