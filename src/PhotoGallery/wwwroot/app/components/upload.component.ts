import {NgModule, Component, Injectable, OnInit, ElementRef, Directive} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Upload } from  '../core/domain/upload';
import { DataService } from '../core/services/data.service';
import { UtilityService } from '../core/services/utility.service';
import { NotificationService } from '../core/services/notification.service';
import { Router } from '@angular/router';
import { OperationResult } from '../core/domain/operationResult';



@Component({
    selector: 'upload',
    templateUrl: './app/components/upload.component.html'
})
export class UploadComponent {
    private _photoAPI: string = 'api/photos/upload';
    private _upload: Upload;
    private id_album: number;


    file: any[];
    files: any[] = [];
    trucks: any[];
    errorMessage: any;
    checked: boolean;



    constructor(public http: Http, public createService: DataService, public utilityService: UtilityService,
        public notificationService: NotificationService, public router: Router )
    {

    }

    ngOnInit() {
        this.createService.set(this._photoAPI, 3);
        this.id_album = localStorage.getItem('id_album');
    }
    
    changeListner(event) {

        console.log('bat dau goi ham');
        this.files = event.srcElement.files;
        console.log(this.files);
        this.id_album = localStorage.getItem('id_album');
    }



    ngOnChanges(): void {

    }

    //onClickUploadDocument(event) {
    //    console.log("clicked")
    //    var file = event.target.files;

    //    console.log("file: ", file);

    //    for (let i = 0; i < file.length; i++) {
    //        var fileInfo = file[i];
    //        console.log("files are: ", fileInfo);
    //        this.files.push(fileInfo);

    //    }
    //}




    tensukien(event) {
        console.log("fthuchien");
       // this._upload = new Upload(this.id_album, this.files);

//        var _uploadResult: OperationResult = new OperationResult(false, '');
//        console.log(this._upload);

        let file: File = this.files[0];

        console.log(this.files.length);

        for (var i = 0; i < this.files.length; i++) {
            this.uploadFile(this.files[i]);
        }


        //this.http.post('http://localhost:9823/api/photos/upload', formData)
        //    .subscribe(res => {
        //        console.log(res);
        //    },
        //    error => console.error('Error: ' + error));


        //this.createService.post(this._upload)
        //    .subscribe(res => {
        //        _uploadResult.Succeeded = res.Succeeded;
        //        _uploadResult.Message = res.Message;

        //    },
        //    error => console.error('Error: ' + error),
        //    () => {
        //        if (_uploadResult.Succeeded) {
        //            this.notificationService.printSuccessMessage('Upload Success Photo :');
        //            this.router.navigate(['albums']);
        //        }
        //        else {
        //            this.notificationService.printErrorMessage(_uploadResult.Message);
        //        }
        //    });
        console.log("thuchienxong");
    }
    uploadFile(files: File): Promise<any> {
        return new Promise((resolve, reject) => {

            let xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.response);
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                        console.log(xhr.response);

                    }
                }
            };

            xhr.open('POST', 'http://localhost:9823/api/photos/upload', true);

            let formData = new FormData();   
            formData.append("files", files, files.name);
            formData.append("ID_Album", 10);

            xhr.send(formData);
        });
    }

}
