import { Routes } from '@angular/router';
import { BikeTableComponent } from './admin/bike-table/bike-table.component';
import { BikeFormComponent } from './admin/bike-form/bike-form.component';
import { UserTableComponent } from './admin/user-table/user-table.component';
import { UserFormComponent } from './admin/user-form/user-form.component';
import { ReservationTableComponent } from './admin/reservation-table/reservation-table.component';

import { HomepageComponent } from './client/homepage/homepage.component';
import { LayoutAdminComponent } from './admin/layout-admin/layout-admin.component';
import { LayoutClientComponent } from './client/layout-client/layout-client.component';
import { AboutpageComponent } from './client/aboutpage/aboutpage.component';
import { ReservationpageComponent } from './client/reservationpage/reservationpage.component';
import { LoginComponent } from './client/login/login.component';
import { SignupComponent } from './client/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { UserpageComponent } from './client/userpage/userpage.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ReservationbikeComponent } from './client/reservationbike/reservationbike.component';

import { SelecitonComponent } from './seleciton/seleciton.component';



export const routes: Routes = [
    {path: '', component: SelecitonComponent },
    
    {
        path: 'admin', component: LayoutAdminComponent, 
        children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'bikes', component: BikeTableComponent},
            {path: 'createbike', component: BikeFormComponent},
            {path: 'edit/:id', component: BikeFormComponent},
            {path: 'users', component: UserTableComponent},
            {path: 'edituser/:id', component: UserFormComponent},
            {path: 'reservations', component: ReservationTableComponent}
            
            
        
        ]
    },
    {
        path: 'client', component: LayoutClientComponent,
        children: [
            {path: 'home', component: HomepageComponent},
            {path: 'about', component: AboutpageComponent},
            {path: 'reservation', component: ReservationpageComponent},
            {path: 'reservationbike/:id', component: ReservationbikeComponent, canActivate: [AuthGuard]},
            {path: 'login', component: LoginComponent},
            {path: 'signup', component: SignupComponent},
            {path: 'userpage', component: UserpageComponent}
                   
        ]
    } 
    
];
