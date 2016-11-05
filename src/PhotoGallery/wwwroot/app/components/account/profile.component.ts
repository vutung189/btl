import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MembershipService } from '../../core/services/membership.service';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Registration } from '../../core/domain/registration';


@Component({
    selector: 'profile',
    templateUrl: './app/components/account/profile.component.html'
})
export class ProfileComponent  implements OnInit {

    public user = JSON.parse(localStorage.getItem('user'));
    public userInfo: Registration;
    public userName: string;
    public password: string;
    public email: string;
    constructor(public http: Http,public membershipService: MembershipService,public element: ElementRef) { }

    ngOnInit() {
        this.getUser();
    }

    changeListner(event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');


        reader.onload = function (e: FileReaderEvent) {
            console.log('e: ' + e.target.result);
            var src = e.target.result;
            image.src = src;
        };
  
        reader.readAsDataURL(event.target.files[0]);
    }
    getUser(){
        var userString ;
        console.log('user name : ', this.user.Username);
     
        var parameter = new URLSearchParams();
        parameter.set('Username', this.user.Username);

        this.http.get('http://localhost:9823/api/account/get', { search: parameter }).subscribe(res => {
            var data: any = res.json();

            console.log(res);
            this.userName = data.Username;
            this.password = data.Password;
            this.email= data.Email;
          
        });
    }


}

interface FileReaderEventTarget extends EventTarget {
    result: string
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}