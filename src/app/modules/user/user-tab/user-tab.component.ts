import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { AdminService } from 'src/app/shared/services';

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.css']
})
export class UserTabComponent implements OnInit {
  user:User;
  loading: boolean;
  submitted: boolean

  constructor(private adminService: AdminService) {
    this.user = new User();
    this.submitted = false;
    this.loading = false;
   }
  ngOnInit(): void {
    
  }


     /**
   * Save user details
   */
  saveUser(form: NgForm) {
    this.submitted = true;
      // stop here if form is invalid
      if (form.invalid) {
        return;
      }
  
      this.loading = true;
      delete this.user._id;
      this.adminService.addUser(this.user).subscribe(data => {
            if (data) {
              this.loading = false;
              alert('Added Successfully')

            
            }
          },
        );
    }
  


}
