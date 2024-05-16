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
import Customer from '../entities/Customer'
import Transaction from '../entities/Transaction'
import ProductCustomer from '../entities/ProductCustomer'

@Index('cart_id', ['cartId'], { unique: true })
@Entity('cart', { schema: 'public' })
export default class Cart extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'cart_id' })
  cartId!: number

  @Column('boolean', {
    name: 'is_processed',
    nullable: true,
    default: () => 'false',
  })
  isProcessed!: boolean | null

  @Column('numeric', { name: 'total', nullable: true, precision: 10, scale: 2 })
  total!: number | null

  @ManyToOne(() => Customer, (customer) => customer.carts)
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'customerId' }])
  customer!: Customer

  @ManyToOne(() => Transaction, (transaction) => transaction.carts)
  @JoinColumn([
    { name: 'transaction_id', referencedColumnName: 'transactionId' },
  ])
  transaction!: Transaction

  @OneToMany(() => ProductCustomer, (productCustomer) => productCustomer.cart)
  productCustomers!: ProductCustomer[]

  public get products() {
    return this.productCustomers.map((pc) => {
      const product = pc.productSizeQuantity
      product.updateProductQuantityAndPrice(pc.quantity, pc.price)
      return product
    })
  }
}
