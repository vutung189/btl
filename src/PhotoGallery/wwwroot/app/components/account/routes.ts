import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ProfileComponent} from './profile.component';
export const accountRoutes: Routes = [
    {
        path: 'account',
        component: AccountComponent,
        children: [
            { path: 'register', component: RegisterComponent },
            { path: 'login', component: LoginComponent },
            { path: 'profile', component: ProfileComponent }
        ]
    }
];

export const accountRouting: ModuleWithProviders = RouterModule.forChild(accountRoutes);