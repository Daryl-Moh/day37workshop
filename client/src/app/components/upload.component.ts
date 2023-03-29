import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CameraService } from '../service/camera.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  imageData!: any;
  blob!: Blob;
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private camSvc: CameraService) { }

  ngOnInit(): void {
    if(!this.camSvc.imageData) {
      this.router.navigate(['/'])
      return;
    }
    this.imageData = this.camSvc.imageData;

    this.form = this.createForm()

    this.blob = this.dataURItoBlob(this.imageData)
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: this.fb.control<string>('', [Validators.required]),
      complain: this.fb.control<string>('', [Validators.required])
    })
  }

  upload(){
    const formVal = this.form.value;
    console.log(formVal);
    console.log(this.blob);
    this.camSvc.upload(formVal, this.blob)
        .then((result)=> {
          console.log('result from spring-boot:', result);
          this.router.navigate(['/display']);
        });
  }

  dataURItoBlob(dataURI: string) {
    var byteString = atob(dataURI.split(',')[1]);
    let mimeString = dataURI.split(',')[0].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for(var i=0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ab], {type: mimeString});

  }

}
