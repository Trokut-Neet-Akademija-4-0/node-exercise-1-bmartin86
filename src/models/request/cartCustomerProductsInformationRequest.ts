import CustomerInformation from '../customerInformation'

export default class CartCustomerProductsInformationRequest {
  public customer!: CustomerInformation

  public address!: CustomerInformation

  public products!: []

  public total!: number
}
