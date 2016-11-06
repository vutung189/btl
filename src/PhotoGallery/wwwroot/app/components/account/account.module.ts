import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


import { DataService } from '../../core/services/data.service';
import { MembershipService } from '../../core/services/membership.service';
import { NotificationService } from '../../core/services/notification.service';

import { AccountComponent } from './account.component';
import { LoginComponent } from './login.component';
import { RegisterComponent }   from './register.component';
import { ProfileComponent } from './profile.component';
import { accountRouting } from './routes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        accountRouting,
        BrowserModule,
        ReactiveFormsModule

    ],
    declarations: [
        AccountComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent
    ],

    providers: [
        DataService,
        MembershipService,
        NotificationService
    ]
})
export class AccountModule { }