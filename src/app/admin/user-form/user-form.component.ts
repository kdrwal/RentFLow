import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../../models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

 user: UserProfile = {
  userId: 0,
  firstName: '',
  lastName: '',
  email: '',
 }

constructor(private userService: UserService, private router: Router,
   private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.route.paramMap.subscribe(pm => {
    const id = pm.get('id');
    if(id){
      this.userService.getUserById(+id).subscribe(user => {
        this.user = user;
      });
    }
  });
}

onSubmit() {
  const action$ = this.userService.updateProfile(this.user);
  action$.subscribe(() => this.router.navigate(['admin/users']));
}

}
