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

@Index('gender_pkey', ['genderId'], { unique: true })
@Entity('gender', { schema: 'public' })
export default class Gender extends BaseEntity {
  @Generated()
  @PrimaryColumn({
    type: 'integer',
    name: 'gender_id',
    transformer: new StringToNumberTransformer(),
  })
  genderId!: number

  @Column('character varying', { name: 'gender_name', length: 56 })
  genderName!: string

  @OneToMany(() => Product, (product) => product.gender)
  products!: Product[]
}
