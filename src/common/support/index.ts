import { GraphQLResolveInfo } from "graphql";
import graphqlFields from 'graphql-fields'
import { CronJob } from 'cron';
import axios from 'axios';
import { GlamourApiUrl } from "../../../config";
import moment from 'moment';


var querystring = require('querystring');
const https = require('https');
export const agent = new https.Agent({
  rejectUnauthorized: false
});
export const getAttributesFromGraphQlInfo = (info: GraphQLResolveInfo) => {
  let obj = graphqlFields(info).Result;
  console.log(obj);

  const getKeys = (o: any): any => {
    return Object.keys(o).filter(m => m != "PriceDesc" && m != "TotalPrice" && m != "Providers" && m != "Offer" && m != "RankedBy").map(k => {
      if (!isEmpty(o[k])) {
        let ret: any = {};
        ret[k] = getKeys(o[k]);
        return ret;
      }
      return k;

    });
  }
  return getKeys(obj);
}


export const isEmpty = (obj: any) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}


export const runDailyGob = (hour:number, fn:any)=>{   
    var job= new CronJob(`00 38 ${hour} * * 0-6`, fn, function () { 
           
        },
        true 
      );
      return job;
}

export const runGobByMinuts = (minutes: number, fn: any) => {
  var job = new CronJob(`0 */${minutes} * * * *`, fn, function () {

  },
    true
  );
  return job;

}
//export class Dic

export const runGobByDate = (dateStr: any, fn: any, completeFn: any) => {//(a: number) => void
  let _date = new Date(dateStr);
  _date.setSeconds(_date.getSeconds() + 30);
  if (_date)
     _date.setHours(_date.getHours() + _date.getTimezoneOffset() / 60);
  //let comm = `0 ${_date.getMinutes()} ${_date.getHours()} ${_date.getDate() + 1} ${_date.getMonth() + 1} *`;
  var job = new CronJob(_date, fn, completeFn, true);
  return job;
}

export function makeid(length: number) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function adjustServerTimeZone(_date: Date) {
  if (_date)
    _date.setHours(_date.getHours() + _date.getTimezoneOffset() / 60);
  return _date;
}

export const getTimeString = (time: any) => {
  let date = new Date();
  date.setTime(time);
  date = adjustServerTimeZone(date);
  return date.toLocaleTimeString().substring(0, 4) + date.toLocaleTimeString().substring(7, date.toLocaleTimeString().length);
}

export function deleteNullValues(obj: any) {
  function deleteNull(o: any) {
    Object.keys(o).forEach(k => {
      if (typeof o[k] == 'object' && o[k] != null) deleteNull(o[k]);
      if ((o[k] == null || o[k] == "") && o[k] != 0) delete o[k];
    });
  }
  deleteNull(obj);
  return obj;
}

export const getDayByIndex = (dayIndex: number) => {
  debugger;
  let days = ['Sunday', 'Monday', 'Tuseday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[dayIndex];
}

export const getDateStringWithTime = (date: string) => {
  if (date == '') return '';
  return moment(adjustServerTimeZone(new Date(date)).toISOString()).format("YYYY-MM-DD  hh:mm A")
}

const twoDigits = (d: number) => {
  if (0 <= d && d < 10) return "0" + d.toString();
  if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
  return d.toString();
}

export const toSqlFormat = (date: Date) => {
  return date.getUTCFullYear() + "-" + twoDigits(1 + date.getUTCMonth()) + "-" + twoDigits(date.getUTCDate()) + " " + twoDigits(date.getUTCHours()) + ":" + twoDigits(date.getUTCMinutes()) + ":" + twoDigits(date.getUTCSeconds());
};
export const resetDateTime = (date: Date) => {

  date.setHours(0, 0, 0, 0);
  return date;
}

export function adjustTimeZone(_date: Date) {
  if (_date)
    _date.setHours(_date.getHours() - _date.getTimezoneOffset() / 60);
  return _date;
}

export const getAuthData = async () => {
  let tokenUrl = `${GlamourApiUrl}Account/Auth`;

  return new Promise(async (resolve, reject) => {
    try{
    let tokenRes = await axios.post(tokenUrl, {
      username: 'sz_support_001',
      password: '123456',
      grant_type: 'password'
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      httpsAgent: agent
    });
    resolve(tokenRes.data.Result);
  }catch(ex){
    reject(ex);
  }
  });

}

export const getToken = async () => {
  let tokenUrl = `${GlamourApiUrl}Account/Auth`;

  return new Promise(async (resolve, reject) => {
    try{
    let tokenRes = await axios.post(tokenUrl, {
      username: 'sz_support_001',
      password: '123456',
      grant_type: 'password'
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      httpsAgent: agent
    });
    resolve(tokenRes.data.Result.Token);
  }catch(ex){
    reject(ex);
  }
  });

}

export const IsArabic = (text: string) => {
  var pattern = /[\u0600-\u06FF\u0750-\u077F]/;
  let result = pattern.test(text);
  return result;
}

/* export const mapDataToExcel = (data: any[], columns: any[]) => {
  return data.map(x => {
    let ret: any = {};
    columns.forEach(c => {
      ret[c.name || c.prop] = c.prop.split('.').reduce((p: any, prop: string) =>
        c.resolver ? Resplvers[c.resolver](p[prop], x) : p[prop] ? p[prop] : '', x)
    });
    return ret;
  });
} */

export const getDateString = (date: string) => {
  if (date == '') return '';
  return moment(new Date(date).toISOString()).format("YYYY-MM-DD")
}
