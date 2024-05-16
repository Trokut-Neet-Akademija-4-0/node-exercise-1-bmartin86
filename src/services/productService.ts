import Product from '../entities/Product'
import Image from '../entities/Image'
import HttpError from '../utils/HttpError'
import Gender from '../entities/Gender'
import Category from '../entities/Category'
import { IsNull } from 'typeorm'

class ProductService {
  async getAllProducts(): Promise<Product[]> {
    return Product.find({
      relations: {
        images: true,
        gender: true,
        category: true,
      },
      where: {
        deletedAt: IsNull(),
        images: {
          isThumbnail: true,
        },
      },
    })
  }

  async getProductById(id: number): Promise<Product> {
    const foundProduct = await Product.findOne({
      relations: {
        images: true,
        gender: true,
        category: true,
        productSizeQuantities: true,
      },
      where: {
        productId: id,
        productSizeQuantities: {
          productId: id,
        },
      },
    })
    if (!foundProduct) throw new Error('Id is required!')
    return foundProduct
  }

  async updateProduct(
    productId: number,
    existingProduct: Product,
  ): Promise<Product> {
    const product = await this.getProductById(productId)
    product.updateExistingProduct(existingProduct)
    return product.save()
  }

  async deleteProductById(id: number): Promise<Product> {
    const product = await this.getProductById(id)
    product.deletedAt = new Date()
    return product.save()
  }

  async addNewProduct(prod: Product): Promise<Product> {
    const product = Product.create(prod)
    await product.save()
    if (product.images && product.images.length > 0)
      return this.addNewImagesToExsistingProduct(
        product.productId,
        product.images,
      )
    return product
  }

  //Product Images
  async getProductImages(productId: number): Promise<Image[]> {
    const product = await this.getProductById(productId)
    return product.images
  }

  async addNewImagesToExsistingProduct(
    productId: number,
    newImages: Image[],
  ): Promise<Product> {
    const product = await this.getProductById(productId)
    for await (const image of newImages) {
      const newImageEntity = Image.create(image)
      newImageEntity.product = product
      await newImageEntity.save()
    }
    return this.getProductById(productId)
  }

  async updateExistingImagesInExistingProduct(
    updateImages: Image[],
  ): Promise<Image[]> {
    const updatedImages = new Array<Image>()
    for await (const image of updateImages) {
      const existingImage = await Image.findOne({
        where: {
          imageId: image.imageId,
        },
      })
      if (existingImage) {
        existingImage.imageUrl = image.imageUrl
        existingImage.imageName = image.imageName
        existingImage.imageDescription = image.imageDescription
        existingImage.isThumbnail = image.isThumbnail
        existingImage.isCartImage = image.isCartImage
        existingImage.productId = image.productId
        updatedImages.push(await existingImage.save())
      }
    }
    return updatedImages
  }

  async deleteImageById(id: number): Promise<Image | void> {
    const existingImage = await Image.findOne({
      where: {
        imageId: id,
      },
    })
    if (existingImage) {
      return existingImage.remove()
    }
    return undefined
  }

  //Product Gender
  async getProductGender(productId: number): Promise<Gender> {
    const product = await this.getProductById(productId)
    return product.gender
  }

  //Product Category
  async getProductCategory(productId: number): Promise<Category> {
    const product = await this.getProductById(productId)
    return product.category
  }
}

export default new ProductService()
