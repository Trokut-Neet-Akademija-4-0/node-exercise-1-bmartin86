import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import ProductSizeQuantity from './ProductSizeQuantity'

@Index('product_size_pkey', ['productSizeId'], { unique: true })
@Entity('product_size', { schema: 'public' })
export default class ProductSize extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'smallint', name: 'product_size_id' })
  productSizeId!: number

  @Column('character varying', { name: 'size_name', length: 128 })
  sizeName!: string

  @OneToMany(
    () => ProductSizeQuantity,
    (productSizeQuantity) => productSizeQuantity.productSize,
  )
  productSizeQuantities!: ProductSizeQuantity[]
}
