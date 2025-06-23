interface User {
  id: number;
  name: string;
  email: string;
}

class UserManager {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
    console.log(`User ${user.name} added successfully`);
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  getAllUsers(): User[] {
    return [...this.users];
  }

  removeUser(id: number): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      console.log(`User with ID ${id} removed successfully`);
      return true;
    }
    return false;
  }
}

// Example usage
const userManager = new UserManager();

userManager.addUser({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
});

userManager.addUser({
  id: 2,
  name: 'Jane Smith',
  email: 'jane@example.com',
});

console.log('All users:', userManager.getAllUsers());
console.log('User with ID 1:', userManager.getUserById(1));

export { UserManager, User };
