import {Component, OnInit} from '@angular/core';
import { Photo } from '../core/domain/photo';
import { DataService } from '../core/services/data.service';
import { UtilityService } from '../core/services/utility.service';
@Component({
    selector: 'home',
    templateUrl: './app/components/home.component.html'
})
export class HomeComponent implements OnInit {

    private _photosAPI: string = 'api/photos/timeLine';
    private _photos: Array<Photo>;

    constructor(public photosService: DataService, public utilityService: UtilityService) {
    }

    ngOnInit() {
        this.photosService.set(this._photosAPI, 1);
        this.getPhotos();
    }

    getPhotos(): void {
        let self = this;
        self.photosService.getTimeLine()
            .subscribe(res => {

                var data: any = res.json();

                self._photos = data;

            },
            error => console.error('Error: ' + error));
    }

    search(i): void {
        this.getPhotos();
    };

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}