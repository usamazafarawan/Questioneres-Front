import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, first, of } from 'rxjs';
import { User } from '../shared/models/user.model';
import { LocalStorageService } from '../shared/services';
import { AuthService } from '../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean;
  showPassword:boolean;
  loading: boolean
  user: User;

  constructor(private authService: AuthService, private router: Router, private localStorageService: LocalStorageService, private toastr: ToastrService) { 
    this.submitted = false;
    this.loading = false;
    this.user = new User();

  }
  
  ngOnInit(): void {
  }

  onSubmit(form:NgForm) {
    this.submitted = true;
    if (form.invalid) {
      return;
    }

    this.loading = true;
    const user = {
      email: this.user.email,
      password:this.user.password
    }
    this.authService.login(user).subscribe(data => {
          if (data) {
            console.log(data,'data')
          this.localStorageService.set('user', data);
          this.loading = false;
          if(data.role === 'user'){
          this.router.navigate(['/user']);
          }
          else{
            this.router.navigate(['/home']);
   
          }
        }}),
        catchError((error) => {
          console.log(error, 'error')
          this.loading = false;
          this.toastr.error(error?.error);
          return of(error)
        })
  }
}

