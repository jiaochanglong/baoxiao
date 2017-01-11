import { Component, OnInit } from '@angular/core';
import {GetListService} from '../getList.service';




@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [GetListService]
})
export class IndexComponent implements OnInit {

   title = '';
  selected_day;
  data;
  constructor(private getListService: GetListService) { }
  getList(): void {
    this.data = this.getListService.getList();
    this.selected_day = this.data.today;
    console.log(this.data);
  }

  ngOnInit(): void {
      this.getList();
  }
  onSelect(day): void {
    if (!day.date_str) {
      return;
    }
    if(this.selected_day == day){
      day.isWork = !day.isWork;
    }
    this.selected_day = day;
  }
  changeTime (){
    let that = this;
    setTimeout(function(){
    // debugger
      that.data = that.getListService.changeTime(that.data);
    },30)
  }

}
