import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'profile',
    templateUrl: './app/components/account/profile.component.html'
})
export class ProfileComponent {
    

    constructor(public element: ElementRef) { }

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
}

interface FileReaderEventTarget extends EventTarget {
    result: string
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}