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
import ProductSizeQuantity from './ProductSizeQuantity'
import StringToFloatTransformer from '../utils/stringToFloatTransformer'

@Index('product_customer_pkey', ['productCustomerId'], { unique: true })
@Entity('product_customer', { schema: 'public' })
export default class ProductCustomer extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'product_customer_id' })
  productCustomerId!: number

  @Column('smallint', { name: 'quantity' })
  quantity!: number

  @Column('numeric', {
    name: 'price',
    precision: 10,
    scale: 2,
    transformer: new StringToFloatTransformer(),
  })
  price!: number

  @ManyToOne(() => Cart, (cart) => cart.productCustomers)
  @JoinColumn([{ name: 'cart_id', referencedColumnName: 'cartId' }])
  cart!: Cart

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
    return pk
  }
}
