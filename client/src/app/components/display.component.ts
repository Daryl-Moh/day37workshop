import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../service/display.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor(private dispSvc: DisplayService) { }

  ngOnInit(): void {
      

      console.log(' From ngOnInint in DisplayComponenet')
  }
}
