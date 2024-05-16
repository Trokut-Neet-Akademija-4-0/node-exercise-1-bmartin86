// src/index.js
import express, { Express } from 'express'
import 'reflect-metadata'
import dataSource from './app-data-source'

import { json } from 'body-parser'
import { errorHandler } from './middlewares/errorHandler'
import 'express-async-errors'

import homeRoutes from './routes/homeRoutes'
//import userRoutes from './routes/userRoutes'
import cartRoutes from './routes/cartRoutes'
import productRoutes from './routes/productRoutes'
import ProductImporter from './config/productImporter'
import categoryRoutes from './routes/categoryRoutes'

dataSource
  .initialize()
  .then(async () => {
    console.log('Data Source has been initialized!')
    await ProductImporter.loadAllProducts()
  })
  .catch((err: any) => {
    console.error('Error during Data Source initialization:', err)
  })

//const app: Express = express()
const port = process.env.PORT || 3000

// Express initialization
const app = express()

// Middlewares
app.use(json())

app.use('/', homeRoutes)
//app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)
app.use('/category', categoryRoutes)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

export default app
