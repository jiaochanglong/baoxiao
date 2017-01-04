import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-dayItem',
  templateUrl: './dayItem.component.html',
  styleUrls: ['./dayItem.component.css']
})
export class DayItemComponent {

  constructor() { }

  @Input()selected;
  @Input()day;
}