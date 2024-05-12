import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import ProductCustomer from './ProductCustomer'
import Product from './Product'
import ProductSize from './ProductSize'

@Index('product_size_quantity_pkey', ['productSizeQuantityId'], {
  unique: true,
})
@Entity('product_size_quantity', { schema: 'public' })
export default class ProductSizeQuantity extends BaseEntity {
  @Column('smallint', { name: 'quantity', nullable: true })
  quantity!: number | null

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'product_size_quantity_id' })
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
}
