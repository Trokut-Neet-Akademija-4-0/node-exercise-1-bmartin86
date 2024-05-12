import { Request, Response } from 'express'
import productService from '../services/productService'
import Product from '../entities/Product'
import Image from '../entities/Image'

const getAllProducts = async (req: Request, res: Response) => {
  res.send(await productService.getAllProducts())
}

const getProductById = async (req: Request, res: Response) => {
  res.send(
    await productService.getProductById(Number.parseInt(req.params.id, 10)),
  )
}

const updateProductById = async (req: Request, res: Response) => {
  const productId = Number.parseInt(req.params.id, 10)
  const existingProduct = req.body as Product
  res.send(await productService.updateProduct(productId, existingProduct))
}

const createProduct = async (req: Request, res: Response) => {
  const newProduct = req.body as Product
  res.send(await productService.addNewProduct(newProduct))
}

const deleteProductById = async (req: Request, res: Response) => {
  res.send(
    await productService.deleteProductById(Number.parseInt(req.params.id, 10)),
  )
}

const getProductImages = async (req: Request, res: Response) => {
  const productId = Number.parseInt(req.params.id, 10)
  res.send(await productService.getProductImages(productId))
}

const addProductImages = async (req: Request, res: Response) => {
  const productId = Number.parseInt(req.params.id, 10)
  const newImages = req.body as Image[]
  res.send(
    await productService.addNewImagesToExsistingProduct(productId, newImages),
  )
}

const updateImages = async (req: Request, res: Response) => {
  const images = req.body as Image[]
  res.send(await productService.updateExistingImagesInExistingProduct(images))
}

const deleteImageById = async (req: Request, res: Response) => {
  res.send(
    await productService.deleteImageById(Number.parseInt(req.params.id, 10)),
  )
}
export {
  getAllProducts,
  getProductById,
  updateProductById,
  createProduct,
  deleteProductById,
  getProductImages,
  addProductImages,
  updateImages,
  deleteImageById,
}
