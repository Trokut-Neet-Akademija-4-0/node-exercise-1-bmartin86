interface User {
  id: string
  name: string
}

class UserService {
  private users: User[] = []

  constructor() {
    // Initially, let's add some dummy users
    this.users.push({ id: '1', name: 'Alice' })
    this.users.push({ id: '2', name: 'Bob' })
    this.users.push({ id: '3', name: 'Charlie' })
  }

  getAllUsers(): User[] {
    return this.users
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id)
  }

  deleteUserById(id: string): User[] | undefined {
    return this.users.splice(
      this.users.findIndex((user) => user.id === id),
      1,
    )
  }
}

export default new UserService()
