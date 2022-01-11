import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEmpleadoComponent } from './crear-empleado/crear-empleado.component';
import { ListaEmpleadoComponent } from './lista-empleado/lista-empleado.component';
import { InfoEmpleadosComponent } from './info-empleados/info-empleados.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'lista-empleados/crear-empleados', component:CrearEmpleadoComponent},
  {path:'crear-empleados/:idempleado', component:CrearEmpleadoComponent},
  {path:'lista-empleados', component:ListaEmpleadoComponent, canActivate:[AuthGuard]},
  {path:'info-empleados/:idempleado', component:InfoEmpleadosComponent},
  {path:'info-empleados/1/lista-empleados', component:ListaEmpleadoComponent},
  {path:'info-empleados/4/lista-empleados', component:ListaEmpleadoComponent},
  {path:'info-empleados/8/lista-empleados', component:ListaEmpleadoComponent},
  {path:'info-empleados/9/lista-empleados', component:ListaEmpleadoComponent},
  {path:'info-empleados/10/lista-empleados', component:ListaEmpleadoComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'login'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
