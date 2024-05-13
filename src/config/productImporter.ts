/* eslint-disable prefer-destructuring */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import fs from 'fs'
import { parse } from 'csv'
import path from 'path'
import Product from '../entities/Product'
import Image from '../entities/Image'
import ProductSizeQuantity from '../entities/ProductSizeQuantity'
import FileImportTracker from '../entities/FileImportTracker'

export default class ProductImporter {
  static async loadAllProducts(): Promise<void> {
    if (!process.env.IMPORTS_FOLDER_PATH) {
      console.log('import folder not a path')
      return
    }
    const allFilePathsInDirectory = (
      await fs.promises.readdir(process.env.IMPORTS_FOLDER_PATH, {
        withFileTypes: true,
      })
    )
      .filter((file) => file.isFile() && file.name.split('.').pop() === 'csv')
      .map((file) => file.name)
    try {
      for await (const fileName of allFilePathsInDirectory) {
        const alreadyImported = await FileImportTracker.exists({
          where: {
            name: fileName,
          },
        })

        if (alreadyImported) continue

        const parser = await fs
          .createReadStream(
            path.join(process.env.IMPORTS_FOLDER_PATH, fileName),
            'utf8',
          )
          .pipe(
            parse({
              // CSV options if any
              delimiter: ',',
            }),
          )
        for await (const record of parser) {
          const product =
            ProductImporter.ConvertCSVRecordToProductEntity(record)
          await product.save()

          const image = ProductImporter.ConvertCSVRecordToImageEntity(record)
          await image.save()

          const productSizeQuantity =
            ProductImporter.ConvertCSVRecordToProductSizeQuantityEntity(record)
          await productSizeQuantity.save()
        }
        const importTracker = new FileImportTracker()
        importTracker.name = fileName
        await importTracker.save()
        console.log(`Imported file: ${fileName}`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  private static ConvertCSVRecordToProductEntity(record: string[]): Product {
    const product = new Product()
    product.genderId = Number.parseInt(record[0])
    product.categoryId = Number.parseInt(record[1])
    product.productName = record[2]
    product.productDescription = record[3]
    product.productPrice = Number.parseInt(record[4], 10)
    product.discountPercentage = Number.parseInt(record[5], 10)
    return product
  }

  private static ConvertCSVRecordToImageEntity(record: string[]): Image {
    const image = new Image()
    image.productId = Number.parseInt(record[0])
    image.imageUrl = record[1]
    image.imageName = record[2]
    image.imageDescription = record[3]
    image.isThumbnail = record[4].toLowerCase() === 'true'
    image.isCartImage = record[5].toLowerCase() === 'true'
    return image
  }

  private static ConvertCSVRecordToProductSizeQuantityEntity(
    record: string[],
  ): ProductSizeQuantity {
    const productSizeQuantity = new ProductSizeQuantity()
    productSizeQuantity.productId = Number.parseInt(record[0])
    productSizeQuantity.productSizeId = Number.parseInt(record[1])
    productSizeQuantity.quantity = Number.parseInt(record[2])
    return productSizeQuantity
  }
}
