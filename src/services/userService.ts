import Customer from '../entities/Customer'
import HttpError from '../utils/HttpError'

class UserService {
  async getUserById(id: number): Promise<Customer> {
    const foundUser = await Customer.findOne({
      relations: {
        address: true,
      },
      where: {
        customerId: id,
      },
    })
    if (!foundUser) throw new HttpError(404, `User with id ${id} not found`)
    return foundUser
  }
}

export default new UserService()
