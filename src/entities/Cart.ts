import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'
import Customer from '../entities/Customer'
import Transaction from '../entities/Transaction'
import ProductCustomer from '../entities/ProductCustomer'
import StringToNumberTransformer from '../utils/stringToNumberTransformer'
import StringToFloatTransformer from '../utils/stringToFloatTransformer'

@Index('cart_id', ['cartId'], { unique: true })
@Entity('cart', { schema: 'public' })
export default class Cart extends BaseEntity {
  @Generated()
  @PrimaryColumn({
    type: 'bigint',
    name: 'cart_id',
    transformer: new StringToNumberTransformer(),
  })
  cartId!: number

  @Column('boolean', {
    name: 'is_processed',
    // nullable: true,
    default: () => 'false',
  })
  isProcessed!: boolean

  @Column('numeric', {
    name: 'total',
    nullable: true,
    precision: 10,
    scale: 2,
    transformer: new StringToFloatTransformer(),
  })
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

  public async UpdateTotal(): Promise<void> {
    if (!this.productCustomers) {
      console.error('productCustomers is undefined')
      return
    }

    this.total = 0
    this.productCustomers.forEach((pc) => {
      if (this.total != null) this.total += pc.price * pc.quantity
      else this.total = pc.price * pc.quantity
    })

    // Log the updated total
    console.log('Updated total:', this.total)

    // Ensure total is a number with two decimal places before saving
    this.total = parseFloat(this.total.toFixed(2))

    await this.save()
  }
}
