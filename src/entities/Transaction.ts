import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Cart from './Cart'

@Index('transaction_pkey', ['transactionId'], { unique: true })
@Entity('transaction', { schema: 'public' })
export default class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'transaction_id' })
  transactionId!: number

  @Column('numeric', { name: 'total', precision: 10, scale: 2 })
  total!: number

  @OneToMany(() => Cart, (cart) => cart.transaction)
  carts!: Cart[]
}
