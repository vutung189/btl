import { Component, OnInit } from '@angular/core';
import { Create } from '../core/domain/create';
import { Router } from '@angular/router';
import { OperationResult } from '../core/domain/operationResult';
import { Paginated } from '../core/common/paginated';
import { DataService } from '../core/services/data.service';
import { UtilityService } from '../core/services/utility.service';
import { NotificationService } from '../core/services/notification.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
@Component({
    selector: 'create',
    templateUrl: './app/components/create.component.html'
})
export class CreateComponent implements OnInit {
    private _albumsAPI: string = 'api/albums/create';
    private _create: Create;
    loginForm: FormGroup;
    constructor(fb: FormBuilder, public createService: DataService,
        public utilityService: UtilityService,
        public notificationService: NotificationService, public router: Router) {
        this.loginForm = fb.group({
            title: ["", Validators.required],
            description: ["", Validators.required]
        });
    }
    ngOnInit() {
        this.createService.set(this._albumsAPI, 3);
    }
    doLogin(event) {
        console.log(this.loginForm.value);
        var user = JSON.parse(localStorage.getItem('user'));
        var title = this.loginForm.value.title;
        console.log(title);
        var description = this.loginForm.value.description;
        this._create = new Create(title, description, user.Username);
        var _createResult: OperationResult = new OperationResult(false, '');
        console.log(this._create);
        this.createService.post(this._create)
            .subscribe(res => {
                _createResult.Succeeded = res.Succeeded;
                _createResult.Message = res.Message;

            },
            error => console.error('Error: ' + error),
            () => {
                if (_createResult.Succeeded) {
                    this.notificationService.printSuccessMessage('Create Success Album :' + this._create.Title);
                    this.router.navigate(['albums']);
                }
                else {
                    this.notificationService.printErrorMessage(_createResult.Message);
                }
            });
    }
    

}