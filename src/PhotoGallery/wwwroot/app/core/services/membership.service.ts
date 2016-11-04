import { Http, Response, Request } from '@angular/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Registration } from '../domain/registration';
import { User } from '../domain/user';

@Injectable()
export class MembershipService {

    private _accountRegisterAPI: string = 'api/account/register/';
    private _accountLoginAPI: string = 'api/account/authenticate/';
    private _accountLogoutAPI: string = 'api/account/logout/';

    private _accountGetAPI: string = 'api/account/get/';

    public _baseUri: string = 'api/account/get/';

    constructor(public accountService: DataService, public http: Http) { }

    register(newUser: Registration) {

        this.accountService.set(this._accountRegisterAPI);
        
        return this.accountService.post(JSON.stringify(newUser));
    }

    login(creds: User) {
        this.accountService.set(this._accountLoginAPI);
        return this.accountService.post(JSON.stringify(creds));
    }

    logout() {
        this.accountService.set(this._accountLogoutAPI);
        return this.accountService.post(null, false);
    }

    isUserAuthenticated(): boolean {
        var _user: User = localStorage.getItem('user');
        if (_user != null)
            return true;
        else
            return false;
    }

    getLoggedInUser(): User {
        var _user: User;

        if (this.isUserAuthenticated()) {
            var _userData = JSON.parse(localStorage.getItem('user'));
            _user = new User(_userData.Username, _userData.Password);
        }

        return _user;
    }
/*
    getUser(Username: String) {

        this.accountService.set(this._accountGetAPI);

        return this.accountService.post(JSON.stringify(Username));
    }
*/
    getUser(data?: any, mapJson: boolean = true) {

        if (mapJson)
            return this.http.post(this._baseUri, data)
                .map(response => <any>(<Response>response).json());
        else
            return this.http.post(this._baseUri, "tung");
    }

}