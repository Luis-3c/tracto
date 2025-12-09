export function useCalculateDelay(scheduledTime: number, estimatedTime: number, realTime: number) {
    const delay  = {
        value: 0,
        text: 'test'
    }

    if(realTime) {
        delay.value = realTime - scheduledTime;
    } else if(estimatedTime) {
        delay.value = estimatedTime - scheduledTime;
    }

    if(delay.value > 0) {
        delay.text = 'Delayed';
    } else if(delay.value < 0) {
        delay.text = 'Early';
    }
    
    return {
        delay
    }
}