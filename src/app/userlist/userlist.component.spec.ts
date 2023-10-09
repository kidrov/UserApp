import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(response => {
        // Handle success and error cases
        console.log('User deleted:', id);
        this.loadUsers(); // Refresh the user list
        alert('Data deleted');
      });
    }
  }

  editUserForm(user: any) {
    // Implement your edit logic here, such as opening a modal or form
    console.log('Edit user:', user);
  }
}
