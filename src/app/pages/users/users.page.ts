import { Component } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage {
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
  ];
  
  newUser: User = { id: 0, name: '', email: '' };

  constructor() {}

  addUser() {
    const newId = this.users.length + 1;
    this.users.push({ id: newId, name: this.newUser.name, email: this.newUser.email });
    this.newUser = { id: 0, name: '', email: '' };
  }

  editUser(user: User) {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = { ...user };
    }
  }

  deleteUser(user: User) {
    this.users = this.users.filter(u => u.id !== user.id);
  }
}
