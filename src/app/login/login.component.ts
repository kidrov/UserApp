import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.loginService.login(email, password).subscribe(
        response => {
          // Handle successful login response here
          console.log('Login successful:', response);
          this.errorMessage = ''; // Clear error message
          this.snackBar.open('Login successful', 'Close', {
            duration: 3000, // Display the snackbar for 3 seconds
          });
        },
        error => {
          // Handle error response here
          console.error('Login error:', error);
          this.errorMessage = 'Invalid email or password';
          this.snackBar.open('Invalid email or password', 'Close', {
            duration: 3000, // Display the snackbar for 3 seconds
          });
        }
      );
    }
  }
}
