import express, { Express } from 'express'
import 'reflect-metadata'
import cors from 'cors'
import dataSource from './app-data-source'
import { errorHandler } from './middlewares/errorHandler'
import 'express-async-errors'

import homeRoutes from './routes/homeRoutes'
import cartRoutes from './routes/cartRoutes'
import productRoutes from './routes/productRoutes'
import ProductImporter from './config/productImporter'
import categoryRoutes from './routes/categoryRoutes'
import genderRoutes from './routes/genderRoutes'

const app: Express = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/', homeRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)
app.use('/categories', categoryRoutes)
app.use('/gender', genderRoutes)

// Error handling middleware
app.use(errorHandler)

const startServer = async () => {
  try {
    await dataSource.initialize()
    console.log('Data Source has been initialized!')

    await ProductImporter.loadAllProducts()

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`)
    })
  } catch (err) {
    console.error('Error during Data Source initialization:', err)
  }
}

startServer()

export default app
