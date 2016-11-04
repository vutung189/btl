import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MembershipService } from '../../core/services/membership.service';
import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'profile',
    templateUrl: './app/components/account/profile.component.html'
})
export class ProfileComponent {

    private user = JSON.parse(localStorage.getItem('user'));

    constructor(public http: Http,public membershipService: MembershipService,public element: ElementRef) { }

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
    getUser() {
        var userString ;
        console.log('user name : ', this.user.Username);

        var creds = "Username=tung";

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post('http://localhost:9823/api/account/get', creds, {
            headers: headers
        }).subscribe(res => {
            var data: any = res.json();
            userString = data.Username;
        });

        console.log('ket qua : ', userString);

    }


}

interface FileReaderEventTarget extends EventTarget {
    result: string
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}