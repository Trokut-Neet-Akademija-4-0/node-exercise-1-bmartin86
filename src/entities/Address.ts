import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  Index,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'
import Customer from './Customer'
import AddressInformation from '../models/addressInformation'
import StringToNumberTransformer from '../utils/stringToNumberTransformer'

@Index('address_pkey', ['addressId'], { unique: true })
@Entity('address', { schema: 'public' })
export default class Address extends BaseEntity {
  @Generated()
  @PrimaryColumn({
    type: 'bigint',
    name: 'address_id',
    transformer: new StringToNumberTransformer(),
  })
  addressId!: number

  @Column('character varying', { name: 'street_name', length: 128 })
  streetName!: string

  @Column('character varying', { name: 'house_number', length: 32 })
  houseNumber!: string

  @Column('character varying', {
    name: 'delivery_remark',
    nullable: true,
    length: 1024,
  })
  deliveryRemark!: string | null

  @Column('integer', { name: 'zip_code' })
  zipCode!: string

  @Column('character varying', { name: 'city_name', length: 512 })
  cityName!: string

  @OneToMany(() => Customer, (customer) => customer.address)
  customers!: Customer[]

  public static async GetExistingAddressFromAddressInformation(
    address: AddressInformation,
  ): Promise<Address | null> {
    return Address.findOne({
      where: {
        streetName: address.streetName,
        houseNumber: address.houseNumber,
        zipCode: address.zipCode,
        cityName: address.cityName,
      },
    })
  }

  public static async CreateAddressFromAddressInformation(
    cartAddress: AddressInformation,
  ): Promise<Address> {
    const address = new Address()
    address.streetName = cartAddress.streetName
    address.houseNumber = cartAddress.houseNumber
    address.zipCode = cartAddress.zipCode
    address.cityName = cartAddress.cityName
    address.deliveryRemark = cartAddress.deliveryRemark
    return address.save()
  }
}
