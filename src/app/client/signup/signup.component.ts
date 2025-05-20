import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;

  constructor(private fb : FormBuilder, private auth: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', [Validators.required]],
      
    })
  }

 onSignUp() {
  if(this.signUpForm.valid) {
    //perform logic for signup
    this.auth.signUp(this.signUpForm.value).subscribe({
      next: (res) => {
        alert(res.message);
        this.signUpForm.reset();
        this.router.navigate(['client/login']);
      },
      error: (err) => {
        alert(err?.error.message);
      }
    })
} else {
  
  ValidateForm.validateAllFormFields(this.signUpForm);
  alert("Your form is invalid. Please check the fields and try again.");
}
 }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }


}
