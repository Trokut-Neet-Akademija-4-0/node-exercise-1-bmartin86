import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Cart from './Cart'
import Customer from './Customer'
import ProductSizeQuantity from './ProductSizeQuantity'
import Product from './Product'

@Index('product_customer_pkey', ['productCustomerId'], { unique: true })
@Entity('product_customer', { schema: 'public' })
export default class ProductCustomer extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'product_customer_id' })
  productCustomerId!: number

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

  @Column({ type: 'bigint', name: 'product_size_quantity_id' })
  productSizeQuantityId!: number

  public static CreateCartProduct(
    cart: Cart,
    cartProduct: ProductSizeQuantity,
    quantity: number,
  ) {
    const pk = new ProductCustomer()
    pk.price = cartProduct.product.productPrice
    pk.quantity = quantity
    pk.cart = cart
    pk.productSizeQuantity = cartProduct
    if (cart.customer) pk.customer = cart.customer
    return pk
  }
}
