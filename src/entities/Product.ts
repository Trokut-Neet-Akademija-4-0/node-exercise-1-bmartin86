import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  Index,
  IsNull,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'
import Image from './Image'
import Category from './Category'
import Gender from './Gender'
import ProductSizeQuantity from './ProductSizeQuantity'
import StringToNumberTransformer from '../utils/stringToNumberTransformer'
import StringToFloatTransformer from '../utils/stringToFloatTransformer'

@Index('product_pkey', ['productId'], { unique: true })
@Entity('product', { schema: 'public' })
export default class Product extends BaseEntity {
  @Generated()
  @PrimaryColumn({
    type: 'bigint',
    name: 'product_id',
    transformer: new StringToNumberTransformer(),
  })
  productId!: number

  @Column('character varying', { name: 'product_name', length: 512 })
  productName!: string

  @Column('character varying', {
    name: 'product_description',
    length: 1024,
  })
  productDescription!: string

  @Column('numeric', {
    name: 'product_price',
    precision: 10,
    scale: 2,
    transformer: new StringToFloatTransformer(),
  })
  productPrice!: number

  @Column('smallint', { name: 'discount_percentage' })
  discountPercentage!: number

  @Column('timestamp with time zone', {
    name: 'deleted_at',
    nullable: true,
    default: () => IsNull,
  })
  deletedAt!: Date | null

  @OneToMany(() => Image, (image) => image.product)
  images!: Image[]

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'categoryId' }])
  category!: Category

  @ManyToOne(() => Gender, (gender) => gender.products)
  @JoinColumn([{ name: 'gender_id', referencedColumnName: 'genderId' }])
  gender!: Gender

  @OneToMany(
    () => ProductSizeQuantity,
    (productSizeQuantity) => productSizeQuantity.product,
  )
  productSizeQuantities!: ProductSizeQuantity[]

  @Column({ type: 'integer', name: 'gender_id' })
  genderId!: number

  @Column({
    type: 'bigint',
    name: 'category_id',
    transformer: new StringToNumberTransformer(),
  })
  categoryId!: number

  updateExistingProduct(updatedData: Product) {
    this.productName = updatedData.productName
    this.productDescription = updatedData.productDescription
    this.productPrice = updatedData.productPrice
    this.discountPercentage = updatedData.discountPercentage
    this.genderId = updatedData.genderId
    this.categoryId = updatedData.categoryId
    this.deletedAt = updatedData.deletedAt ?? null
  }
}
