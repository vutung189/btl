import { NgModule,Component, Injectable, OnInit, ElementRef, Directive} from '@angular/core';
import { Router } from '@angular/router';
import { MembershipService } from '../../core/services/membership.service';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Registration } from '../../core/domain/registration';

import { FormsModule, FormBuilder, Validators, FormGroup, FormControl, FormControlDirective, NgControl } from '@angular/forms';


@Component({
    selector: 'profile',
    templateUrl: './app/components/account/profile.component.html'
})

export class ProfileComponent implements OnInit {

    public user = JSON.parse(localStorage.getItem('user'));
    public userName: string;
    public password: string;
    public confirmPassword: string;
    public email: string;
    public userForm: FormGroup;

    constructor(public http: Http, public membershipService: MembershipService, public element: ElementRef,
        public fb: FormBuilder ) {

    }


    ngOnInit() {
        this.getUser();

    }
/*
    matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        console.log("check pass");
        return (group: FormGroup) => {
            let password = group.controls[passwordKey];
            let passwordConfirmation = group.controls[passwordConfirmationKey];

            if (password.value !== passwordConfirmation.value) {
                return passwordConfirmation.setErrors({ notEquivalent: true })
            }
        }
    }
*/

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
            this.email = data.Email;
            this.confirmPassword = data.Password;
        });
    }
    update(): void {

        var parameter = new URLSearchParams();
        parameter.set('Username', this.userName);
        parameter.set('Password', this.password);

        let body = JSON.stringify({ 'Username': this.userName, 'Password': this.password });

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers, method: "post" });

        this.http.post('http://localhost:9823/api/account/update', parameter.toString(), options)
            .subscribe(res => {
                console.log(res);
                alert("Update password succeeded")
            },
            error => console.error('Error: ' + error));
    };



}
  
interface FileReaderEventTarget extends EventTarget {
    result: string
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}