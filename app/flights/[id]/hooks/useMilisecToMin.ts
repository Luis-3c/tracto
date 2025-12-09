export function useMilisecToHrMin(milisec: number): string[] {
    let res = '';
    let min = (Math.floor(milisec / 60));
    if (min < 0) min = min * -1;

    if(min > 60) {
        const hr = Math.floor(min / 60);
        res = `${hr}h ${min % 60}m`;
    } else {
        res = `${min} min`;
    }
    return [res];
}