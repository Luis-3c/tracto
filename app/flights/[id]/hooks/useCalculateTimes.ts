import { ITime } from "../types/IFlightDetail";
import { useMilisecToHrMin } from "./useMilisecToMin";

export function useCalculateElapsedTime(scheduled: ITime, estimated: ITime, real: ITime, live: boolean) {
    let deapertureTime : number;
    let updatedTime : number;
    if(live) {
        deapertureTime = real.departure || 0;
        updatedTime = Math.floor(Date.now() / 1000);
    } else if(real.departure && real.arrival) {
        deapertureTime = real.departure;
        updatedTime = real.arrival;
    } else {
        deapertureTime = scheduled.departure || 0;
        updatedTime = scheduled.arrival || 0;
    }
    const elapsedTime = updatedTime - deapertureTime;
    const [elapsedTimeInHrMin] = useMilisecToHrMin(elapsedTime);
    return {
        elapsedTime: elapsedTimeInHrMin
    }
}

export function useCalculateRemainingTime(scheduled: ITime, estimated: ITime, real: ITime, live: boolean) {
    let arrivalTime : number;
    let updatedTime : number;
    if(live) {
        arrivalTime = estimated.arrival || 0;
        updatedTime = Math.floor(Date.now() / 1000);
    } else if(real.departure && real.arrival) {
        arrivalTime = real.arrival;
        updatedTime = real.arrival
    } else {
        arrivalTime = scheduled.arrival || 0;
        updatedTime = scheduled.departure || 0
    }
    const remainingTime = arrivalTime - updatedTime;
    const [remainingTimeInHrMin] = useMilisecToHrMin(remainingTime);
    
    return {
        remainingTime: remainingTimeInHrMin
    }
}