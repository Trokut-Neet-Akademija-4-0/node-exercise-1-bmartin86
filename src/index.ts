// src/index.js
import express, { Express } from 'express'
import homeRoutes from './routes/homeRoutes'
import userRoutes from './routes/userRoutes'
import cartRoutes from './routes/cartRoutes'
import productRoutes from './routes/productRoutes'

const app: Express = express()
const port = process.env.PORT || 3000

app.use('/', homeRoutes)
//app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
