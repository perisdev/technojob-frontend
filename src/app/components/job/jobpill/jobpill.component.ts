import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-jobpill',
  templateUrl: './jobpill.component.html',
  styleUrls: ['./jobpill.component.scss']
})
export class JobpillComponent implements OnInit {

  @Input()
  index: number;

  @Input()
  top: boolean = false;

  constructor(private storage:StorageService) { }

  ngOnInit() {
    
  }

}
