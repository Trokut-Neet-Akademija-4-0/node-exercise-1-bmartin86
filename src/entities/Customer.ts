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
import Cart from './Cart'
import Address from './Address'
import ProductCustomer from './ProductCustomer'
import CustomerInformation from '../models/customerInformation'

@Index('customer_pkey', ['customerId'], { unique: true })
@Entity('customer', { schema: 'public' })
export default class Customer extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'customer_id' })
  customerId!: number

  @Column('character varying', { name: 'email', length: 256 })
  email!: string

  @Column('character varying', {
    name: 'first_name',
    nullable: true,
    length: 128,
  })
  firstName!: string | null

  @Column('character varying', {
    name: 'last_name',
    nullable: true,
    length: 128,
  })
  lastName!: string | null

  @Column('character varying', { name: 'phone', nullable: true, length: 64 })
  phone!: string | null

  @OneToMany(() => Cart, (cart) => cart.customer)
  carts!: Cart[]

  @ManyToOne(() => Address, (address) => address.customers)
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'addressId' }])
  address!: Address

  @OneToMany(
    () => ProductCustomer,
    (productCustomer) => productCustomer.customer,
  )
  productCustomers!: ProductCustomer[]

  public static async GetExistingCustomerFromCustomerInformation(
    cartCustomer: CustomerInformation,
  ): Promise<Customer | null> {
    return Customer.findOne({
      where: {
        email: cartCustomer.email,
        firstName: cartCustomer.firstName,
        lastName: cartCustomer.lastName,
        phone: cartCustomer.phone,
      },
    })
  }

  public static async CreateCustomerFromCustomerInformation(
    cartCustomer: CustomerInformation,
  ): Promise<Customer> {
    console.log(cartCustomer)
    let address = await Address.GetExistingAddressFromAddressInformation(
      cartCustomer.address,
    )
    if (!address) {
      address = await Address.CreateAddressFromAddressInformation(
        cartCustomer.address,
      )
      await address.save()
    }
    let customer =
      await Customer.GetExistingCustomerFromCustomerInformation(cartCustomer)
    if (!customer) {
      customer = new Customer()
      customer.email = cartCustomer.email
      customer.firstName = cartCustomer.firstName
      customer.lastName = cartCustomer.lastName
      customer.phone = cartCustomer.phone
      customer.address = address
      await customer.save()
    }
    return customer
  }
}
