import { formatDistance } from "date-fns";
import {DateTime} from "luxon";

export function returnTimeDiff(date){
    const start = DateTime.fromJSDate(new Date(Date.parse(date)));
    const end = DateTime.fromJSDate(new Date());

    const units = end.diff(start,['years','months','days','hours','minutes','seconds']).toObject();
    for (const unit in units){
        if (units[unit] >=1 ){
            return Math.floor(units[unit]) + " " + unit;
        }
    }
    return "now";

}