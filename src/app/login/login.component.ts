import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import {} from '../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  empleado = {
    email: 'luis@gmail.com',
    password: '12345'
  }
  constructor(private service:ApiserviceService, private router:Router) { }
  ngOnInit(): void {
  }
  message:any;
  logIn(){
    this.service.login(this.empleado).subscribe((res:any) =>{
      console.log(res);
      localStorage.setItem('token', res.token)
      this.router.navigate(['lista-empleados']);
    });
  }

}
