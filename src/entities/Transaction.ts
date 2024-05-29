import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  Index,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'
import Cart from './Cart'
import StringToNumberTransformer from '../utils/stringToNumberTransformer'

@Index('transaction_pkey', ['transactionId'], { unique: true })
@Entity('transaction', { schema: 'public' })
export default class Transaction extends BaseEntity {
  @Generated()
  @PrimaryColumn({
    type: 'bigint',
    name: 'transaction_id',
    transformer: new StringToNumberTransformer(),
  })
  transactionId!: number

  @Column('numeric', { name: 'total', precision: 10, scale: 2 })
  total!: number

  @OneToMany(() => Cart, (cart) => cart.transaction)
  carts!: Cart[]
}
