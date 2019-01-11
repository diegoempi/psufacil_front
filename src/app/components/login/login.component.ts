import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router ) {

    this.loginForm = this.fb.group({
      rut: new FormControl('',      [Validators.required]),

      password: new FormControl('', [Validators.required]),

    });

  }

  login() {
    const val = this.loginForm.value;

    if (val.rut && val.password) {
      this.authService.login( val.rut, val.password)
        .subscribe(
            () => {
              console.log('User is logged in');
              this.router.navigateByUrl('/home');
            }
        )
    }
  }

  ngOnInit() {
  }

}
