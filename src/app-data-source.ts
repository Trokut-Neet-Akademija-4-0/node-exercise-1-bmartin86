import { DataSource } from 'typeorm'
import Address from './entities/Address'
import Cart from './entities/Cart'
import Category from './entities/Category'
import Customer from './entities/Customer'
import Gender from './entities/Gender'
import Image from './entities/Image'
import Product from './entities/Product'
import ProductCustomer from './entities/ProductCustomer'
import ProductSize from './entities/ProductSize'
import ProductSizeQuantity from './entities/ProductSizeQuantity'
import Transaction from './entities/Transaction'
import FileImportTracker from './entities/FileImportTracker'

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'postgres',
  entities: [
    Address,
    Cart,
    Category,
    Customer,
    Gender,
    Image,
    Product,
    ProductCustomer,
    ProductSize,
    ProductSizeQuantity,
    Transaction,
    FileImportTracker,
  ],
  //entities: ['src/entities/*.ts'],
  //migrations: ['src/migration/*.ts'],
})
