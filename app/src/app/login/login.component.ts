import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: String = "";
  password: String = "";


  constructor(private Router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    // this.authService.authenticateUser(user).subscribe((data:any) => {
    //   if(data.success){
    //     this.authService.storeUserData(data.token,data.user);
    //     this.Router.navigate(['item-list']);
    //     //console.log("jeeeeeeeeee")
    //     } else {
    //       //console.log("nem jó");
    //     }
    // });
    this.authService.login(user).subscribe((data:any) => {
      if(data){
            //this.authService.storeUserData(data.token,data.user);
            this.Router.navigate(['item-list']);
            console.log("jeeeeeeeeee")
            } else {
              console.log("err");
            }
    });
  }

}
