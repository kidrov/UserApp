import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.mode';

@Component({
  selector: 'app-user-list',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }


  deleteUser(id: number | undefined) {
    if (id !== undefined) {
      this.userService.deleteUser(id).subscribe(() => {
        console.log(`User with ID ${id} deleted`);
        this.loadUsers();
      });
    }
  }
}
