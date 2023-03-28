import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamComponent, WebcamImage } from 'ngx-webcam';
import { Subject, Subscription } from 'rxjs';
import { CameraService } from '../service/camera.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnDestroy, AfterViewInit {

  @ViewChild(WebcamComponent)
  webcam!: WebcamComponent;

  width = 400;
  height = 400;
  pics: string[] = []
  sub$!: Subscription;
  trigger = new Subject<void>;
  
  constructor(private router: Router, private cameraSvc: CameraService) { }
  
  ngOnDestroy(): void {
      this.sub$.unsubscribe();
      console.log('this is coming from ngOnDestroy')
  }

  ngAfterViewInit(): void {
      this.webcam.trigger = this.trigger;
      this.sub$ = this.webcam.imageCapture.subscribe(
        this.snapshot.bind(this)
      );
      console.log('this is coming from ngAfterViewInit')
  }

  snap() {
    this.trigger.next();
    console.log('this is triggering from SNAP button')
  }

  snapshot (webcamImg: WebcamImage){
    this.cameraSvc.imageData = webcamImg.imageAsDataUrl;
    this.pics.push(webcamImg.imageAsDataUrl);
    console.log('this is triggering from the snapshot($event)')
  }
}
