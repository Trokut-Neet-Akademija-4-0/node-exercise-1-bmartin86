import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Product from './Product'

@Index('gender_pkey', ['genderId'], { unique: true })
@Entity('gender', { schema: 'public' })
export default class Gender extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'gender_id' })
  genderId!: number

  @Column('character varying', { name: 'gender_name', length: 56 })
  genderName!: string

  @OneToMany(() => Product, (product) => product.gender)
  products!: Product[]
}
