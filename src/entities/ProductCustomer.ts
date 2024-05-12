import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import Cart from './Cart'
import Customer from './Customer'
import ProductSizeQuantity from './ProductSizeQuantity'

@Index('product_customer_pkey', ['customerId', 'productSizeQuantityId'], {
  unique: true,
})
@Entity('product_customer', { schema: 'public' })
export default class ProductCustomer extends BaseEntity {
  @Column('bigint', { primary: true, name: 'product_size_quantity_id' })
  productSizeQuantityId!: string

  @Column('bigint', { primary: true, name: 'customer_id' })
  customerId!: number

  @Column('smallint', { name: 'quantity' })
  quantity!: number

  @Column('numeric', { name: 'price', precision: 10, scale: 2 })
  price!: number

  @ManyToOne(() => Cart, (cart) => cart.productCustomers)
  @JoinColumn([{ name: 'cart_id', referencedColumnName: 'cartId' }])
  cart!: Cart

  @ManyToOne(() => Customer, (customer) => customer.productCustomers)
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'customerId' }])
  customer!: Customer

  @ManyToOne(
    () => ProductSizeQuantity,
    (productSizeQuantity) => productSizeQuantity.productCustomers,
  )
  @JoinColumn([
    {
      name: 'product_size_quantity_id',
      referencedColumnName: 'productSizeQuantityId',
    },
  ])
  productSizeQuantity!: ProductSizeQuantity
}
