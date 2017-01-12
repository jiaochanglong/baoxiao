import { Injectable } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class GetListService {

    private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
    constructor(private http: Http) { }

    hlist = [];
    getList() {
        return new Promise((resolve, reject) => { 
            
            this.setDay().then(data=>{
                resolve(data)
            })
        })
    }

    // getHolidayList() {
    //     let _this = this;
    //     let ynow = new Date().getFullYear();
    //     this.http.post('http://127.0.0.1:7000/changetime','reqData=' + ynow,{headers: this.headers})
    //     .subscribe(
    //         function(result){
    //             result=result.json();
    //             if(result){
    //                 // console.log(result.data[0].holidaylist);
    //                 let holidaylist = result.data[0].holiday;
    //                 let hmonth , hday ;
    //                 for (let i = 0; i < holidaylist.length; i++){
    //                     _this.hlist.push(holidaylist[i]);
    //                 }
    //                 // _this.setDay();
    //             }
    //         }
    //     );
    // }

    changeTime(data) {
        return this.setDay(data.year, data.month);
    }

    download(data){
        this.http.post('http://nononono.cn:7000/download','reqData=' + JSON.stringify(data),{headers: this.headers})
        
        .subscribe(
            function(data){
                data=data.json();
                if(data){
                    location.href='http://nononono.cn:7000/download?timeName='+data;
                }
            }
        );
        
    }

    setDay(y?:number,m?:number) {
        let res;
        function is_leap(year) { 
            return (year%100==0?res=(year%400==0?1:0):res=(year%4==0?1:0));
        } //是否为闰年

        let nstr=new Date(); //当前Date资讯
        if (y) {
            nstr.setFullYear(y);
            nstr.setMonth(m);
        }
        //  else {
        //     this.getHolidayList();
        // }
        // console.log(this.hlist);
        let ynow=nstr.getFullYear(); //年份
        let mnow=nstr.getMonth(); //月份
        let dnow=nstr.getDate(); //今日日期
        let n1str=new Date(ynow,mnow,1); //当月第一天Date资讯

        let firstday=n1str.getDay(); //当月第一天星期几

        let m_days=new Array(31,28+is_leap(ynow),31,30,31,30,31,31,30,31,30,31); //各月份的总天数

        let tr_str=Math.ceil((m_days[mnow] + firstday)/7); //表格所需要行数
        let day = [];
        let today = {};
        let isHoliday;

        for(let i = 0; i < tr_str; i++) {
            let tr_day = [];
            for(let k = 0; k < 7; k++) {
                let td_day = {};
                let day_val = i*7+k-firstday+1 ;
                if (day_val > 0 && day_val <= m_days[mnow]) {

                    if(y <= ynow) {
                        // isHoliday = k == 0 || k == 6 || isFes;
                    } else {
                        isHoliday = k == 0 || k == 6;
                    }

                    td_day = {
                        idx: i*7+k,
                        date_str: day_val,
                        isHoliday: isHoliday,
                        isWork: !isHoliday,
                        mark:''
                        }
                    if (dnow==day_val) {
                        today = td_day;
                    }
                } else {
                    td_day = {
                            idx: i*7+k
                    }
                }
                tr_day.push(td_day);
                
                
            }
            day.push(tr_day);
        }
        debugger

         return new Promise((resolve, reject) => { 
            // this.http.get(this.getUrl(url),
            // // data,
            // {headers: this.headers})
            // .subscribe(
            //     function(data){
            //         resolve(data.json()); 
            //     }
            // );
            // let _this = this;
            let holidaylistArray:Object[]=[];
            this.http.post('http://127.0.0.1:7000/changetime','reqData=' + ynow,{headers: this.headers})
            .subscribe(
                function(result){
                    result=result.json();
                    if(result){
                        // console.log(result.data[0].holidaylist);
                        let holidaylist:Object[] = result.data[0].holiday;
                        holidaylist.forEach(i=>{
                            i.list.forEach(item=>{
                                holidaylistArray.push({
                                    y:item.date.split('-')[0],
                                    m:item.date.split('-')[1],
                                    d:item.date.split('-')[2],
                                    holiday:item.status
                                })
                            })
                        })
                        holidaylistArray.forEach(i =>{
                            if(i.y==ynow && i.m == mnow) {
                                day
                            }
                        })
                        resolve({
                            day: day,
                            year: ynow,
                            month: mnow,
                            today: today,
                            tr_str: tr_str
                        })
            //             // _this.setDay();
                    }
            //     }
            // );
        })
            

    }
    
}


