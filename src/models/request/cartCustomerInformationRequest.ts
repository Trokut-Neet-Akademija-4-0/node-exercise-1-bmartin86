import CustomerInformation from '../customerInformation'

export default class CartCustomerInformationRequest {
  public customer!: CustomerInformation

  public address!: CustomerInformation
}

// "email": "kupac@test.com",
// "firstName": "Marko",
// "lastName": "Marković",
// "phone": "10101010100",
// "address": {
//     "streetName": "Glavna Ulica",
//     "houseNumber": "46",
//     "deliveryRemark": "Pozvoniti dvaput",
//     "zipCode": 21000,
//     "cityName": "Split"
// }
