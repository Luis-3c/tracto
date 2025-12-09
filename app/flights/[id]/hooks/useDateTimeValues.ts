import { IStatus } from "../types/IFlightDetail";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'


dayjs.extend(utc);
dayjs.extend(timezone)

export default function useDateTimeValues(scheduledTime: number, realTime: number | null, estimatedTime: number | null, timezone: string, status: IStatus, type: string) {
    let formattedDate;
    let formattedDateAbbr;
    let formattedTime;
    if((status.live && type === 'origin') || realTime){
        formattedDate = dayjs.unix(realTime || 0).tz(timezone).format('dddd DD-MM-YYYY');
        formattedDateAbbr = dayjs.unix(realTime || 0).tz(timezone).format('ddd DD-MM-YYYY');
        formattedTime = dayjs.unix(realTime || 0).tz(timezone).format('hh:mm A');
    } else if (estimatedTime){
        formattedDate = dayjs.unix(estimatedTime).tz(timezone).format('dddd DD-MM-YYYY');
        formattedDateAbbr = dayjs.unix(estimatedTime).tz(timezone).format('ddd DD-MM-YYYY');
        formattedTime = dayjs.unix(estimatedTime).tz(timezone).format('hh:mm A');
    } else {
        formattedDate = dayjs.unix(scheduledTime).tz(timezone).format('dddd DD-MM-YYYY');
        formattedDateAbbr = dayjs.unix(scheduledTime).tz(timezone).format('ddd DD-MM-YYYY');
        formattedTime = dayjs.unix(scheduledTime).tz(timezone).format('hh:mm A');
    }

    return {
        formattedDate,
        formattedDateAbbr,
        formattedTime
    }
    
}