import {NgModule, Component, Injectable, OnInit, ElementRef, Directive} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Upload } from '../core/domain/upload';
import { AlbumPhotosComponent } from '../components/album-photos.component';
import { Router, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';




@Component({
    selector: 'upload',
    templateUrl: './app/components/upload.component.html'
})
export class UploadComponent {
    private _photoAPI: string = 'api/photos/upload';
    private id_album: number;
    private sub: Subscription;
    
    files: any[] = [];

    constructor(public http: Http, public router: Router, private route: ActivatedRoute) {
        
    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.id_album = params['id']; // (+) converts string 'id' to a number

        });

        console.log(this.id_album);
    }

    changeListner(event) {

        console.log('bat dau goi ham');
        this.files = event.srcElement.files;
        console.log(this.files);

    }

    ngOnChanges(): void {

    }

    tensukien(event) {
        console.log("fthuchien");

        let file: File = this.files[0];

        console.log(this.files.length);

        for (var i = 0; i < this.files.length; i++) {
            this.uploadFile(this.files[i]);
        }

        console.log("thuchienxong");
        console.log(this.id_album);
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
            formData.append("ID_Album", this.id_album);

            xhr.send(formData);
            this.router.navigate(['albums']);
        });
    }

}
