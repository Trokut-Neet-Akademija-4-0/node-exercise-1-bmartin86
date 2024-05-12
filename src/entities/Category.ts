import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Product from './Product'

@Index('category_pkey', ['categoryId'], { unique: true })
@Entity('category', { schema: 'public' })
export default class Category extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'category_id' })
  categoryId!: number

  @Column('character varying', { name: 'category_name', length: 256 })
  categoryName!: string

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[]
}
