import { Injectable } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map'

function setDay (y?:number,m?:number) {
    let res;
    function is_leap(year) { 
    return (year%100==0?res=(year%400==0?1:0):res=(year%4==0?1:0));
    } //是否为闰年

    let nstr=new Date(); //当前Date资讯
    if (y) {
        nstr.setFullYear(y);
        nstr.setMonth(m);
    }
    let ynow=nstr.getFullYear(); //年份
    let mnow=nstr.getMonth(); //月份
    let dnow=nstr.getDate(); //今日日期
    let n1str=new Date(ynow,mnow,1); //当月第一天Date资讯

    let firstday=n1str.getDay(); //当月第一天星期几

    let m_days=new Array(31,28+is_leap(ynow),31,30,31,30,31,31,30,31,30,31); //各月份的总天数

    let tr_str=Math.ceil((m_days[mnow] + firstday)/7); //表格所需要行数
    let day = [];
    let today = {};
    for(let i = 0; i < tr_str; i++) {
        let tr_day = [];
        for(let k = 0; k < 7; k++) {
            let td_day = {};
            if (i*7+k-firstday+1 > 0 && i*7+k-firstday+1 <= m_days[mnow]) {
                let isHoliday = k == 0 || k == 6;
                td_day = {
                    idx: i*7+k,
                    date_str: i*7+k-firstday+1,
                    isHoliday: isHoliday,
                    isWork: !isHoliday,
                    mark:''
                    }
                if (dnow==i*7+k-firstday+1) {
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
    return {
        day: day,
        year: ynow,
        month: mnow,
        today: today
    }
}





@Injectable()
export class GetListService {

private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
 constructor(private http: Http) { }

    getList() {
        return setDay();
    }

    changeTime(data) {
        return setDay(data.year, data.month);
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
    
}


