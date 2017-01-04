import { Component, Input } from '@angular/core';
import {GetListService} from '../getList.service';

@Component({
  selector: 'app-extendDay',
  templateUrl: './extendDay.component.html',
  styleUrls: ['./extendDay.component.css'],
  providers: [GetListService]

})
export class ExtendDayComponent  {

  @Input()day;
  @Input()data;
   constructor(private getListService: GetListService) { }
  clickWork () {
    if (this.day.isHoliday && !this.day.mark) {
      this.day.mark = "周末加班"
    }
  }
  download () {
    if(!this.data.name) {
      alert('写名啊！');
      return;
    }
    this.getListService.download(this.data);
  }
 
}