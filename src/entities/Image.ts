import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import Product from './Product'
import StringToNumberTransformer from '../utils/stringToNumberTransformer'

@Index('image_id', ['imageId'], { unique: true })
@Entity('image', { schema: 'public' })
export default class Image extends BaseEntity {
  @Generated()
  @PrimaryColumn({
    type: 'bigint',
    name: 'image_id',
    transformer: new StringToNumberTransformer(),
  })
  imageId!: number

  @Column('character varying', { name: 'image_url', length: 1024 })
  imageUrl!: string

  @Column('character varying', { name: 'image_name', length: 255 })
  imageName!: string

  @Column('character varying', { name: 'image_description', length: 512 })
  imageDescription!: string

  @Column('boolean', { name: 'is_thumbnail', default: () => 'false' })
  isThumbnail!: boolean

  @Column('boolean', { name: 'is_cart_image', default: () => 'false' })
  isCartImage!: boolean

  @ManyToOne(() => Product, (product) => product.images)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'productId' }])
  product!: Product

  @Column({ type: 'bigint', name: 'product_id' })
  productId!: number
}
