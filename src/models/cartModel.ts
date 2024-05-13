import Cart from '../entities/Cart'

class CartModel extends Cart {
  public getProducts() {
    return this.productCustomers.map((pc) => {
      const product = pc.productSizeQuantity
      product.updateProductQuantityAndPrice(pc.quantity, pc.price)
      return product
      // return {
      //   productId: productSizeQuantity.product.productId,
      //   productName: productSizeQuantity.product.productName,
      //   size: productSizeQuantity.productSize,
      //   quantity: productSizeQuantity.quantity,
      //   price: productSizeQuantity.product.productPrice,
      // };
    })
  }
}

export default CartModel
