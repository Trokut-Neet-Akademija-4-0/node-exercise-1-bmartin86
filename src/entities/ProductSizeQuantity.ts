import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'
import ProductCustomer from './ProductCustomer'
import Product from './Product'
import ProductSize from './ProductSize'
import StringToNumberTransformer from '../utils/stringToNumberTransformer'

@Index('product_size_quantity_pkey', ['productSizeQuantityId'], {
  unique: true,
})
@Entity('product_size_quantity', { schema: 'public' })
export default class ProductSizeQuantity extends BaseEntity {
  @Column('smallint', { name: 'available_quantity', nullable: true })
  availableQuantity!: number | null

  @Generated()
  @PrimaryColumn({
    type: 'bigint',
    name: 'product_size_quantity_id',
    transformer: new StringToNumberTransformer(),
  })
  productSizeQuantityId!: number

  @OneToMany(
    () => ProductCustomer,
    (productCustomer) => productCustomer.productSizeQuantity,
  )
  productCustomers!: ProductCustomer[]

  @ManyToOne(() => Product, (product) => product.productSizeQuantities)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'productId' }])
  product!: Product

  @ManyToOne(
    () => ProductSize,
    (productSize) => productSize.productSizeQuantities,
  )
  @JoinColumn([
    { name: 'product_size_id', referencedColumnName: 'productSizeId' },
  ])
  productSize!: ProductSize

  @Column({
    type: 'bigint',
    name: 'product_id',
    transformer: new StringToNumberTransformer(),
  })
  productId!: number

  @Column({ type: 'smallint', name: 'product_size_id' })
  productSizeId!: number

  // updateProductQuantityAndPrice(product: ProductSizeQuantity) {
  //   this.availableQuantity = product.availableQuantity

  //   if (
  //     product.product.discountPercentage &&
  //     product.product.discountPercentage > 0
  //   ) {
  //     // Apply discount if available
  //     this.product.productPrice =
  //       product.product.productPrice *
  //       (1 - product.product.discountPercentage / 100)
  //   } else {
  //     // No discount, simply update the price
  //     this.product.productPrice = product.product.productPrice
  //   }
  // }

  public updateProductQuantityAndPrice(): void {
    if (
      this.product.discountPercentage &&
      this.product.discountPercentage > 0
    ) {
      // Apply discount if available
      this.product.productPrice =
        this.product.productPrice * (1 - this.product.discountPercentage / 100)
    } else {
      // No discount, simply update the price
      this.product.productPrice = this.product.productPrice
    }
  }
}
