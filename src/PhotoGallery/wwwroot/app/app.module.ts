﻿import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Headers, RequestOptions, BaseRequestOptions} from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountModule } from './components/account/account.module';
import { AppComponent }  from './app.component';
import { AlbumPhotosComponent } from './components/album-photos.component';
import { HomeComponent } from './components/home.component';
import { PhotosComponent } from './components/photos.component';
import { AlbumsComponent } from './components/albums.component';
import { CreateComponent } from './components/create.component';
import { routing } from './routes';
import { UploadComponent } from './components/upload.component';


import { DataService } from './core/services/data.service';
import { MembershipService } from './core/services/membership.service';
import { UtilityService } from './core/services/utility.service';
import { NotificationService } from './core/services/notification.service';

class AppBaseRequestOptions extends BaseRequestOptions {
    headers: Headers = new Headers();

    constructor() {
        super();
        this.headers.append('Content-Type', 'application/json');
        this.body = '';
    }
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        AccountModule,
        ReactiveFormsModule
    ],
    declarations: [AppComponent, AlbumPhotosComponent, HomeComponent, PhotosComponent, AlbumsComponent, CreateComponent, UploadComponent],
    providers: [DataService, MembershipService, UtilityService, NotificationService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: RequestOptions, useClass: AppBaseRequestOptions }],
    bootstrap: [AppComponent]
})
export class AppModule { }
