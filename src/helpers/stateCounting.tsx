export function accuracyCounting(mistakes:number, pressingCount:number){
    if(pressingCount){
        return (100 - ((mistakes/pressingCount)*100)).toFixed(2)
    }

    return '0.00';
}

export function speedCounting(correctLetters:number, seconds:number){
    if(seconds){
        return (correctLetters / (seconds/60)).toFixed(2)
    }
    return '0.00'
}