import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  Index,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'
import Product from './Product'
import StringToNumberTransformer from '../utils/stringToNumberTransformer'

@Index('category_pkey', ['categoryId'], { unique: true })
@Entity('category', { schema: 'public' })
export default class Category extends BaseEntity {
  @Generated()
  @PrimaryColumn({
    type: 'bigint',
    name: 'category_id',
    transformer: new StringToNumberTransformer(),
  })
  categoryId!: number

  @Column('character varying', { name: 'category_name', length: 256 })
  categoryName!: string

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[]
}
