export const calcProm = (arr) => {
    const sum = arr.reduce((p, c) => p + c)
    return (sum / arr.length)
}
export const calcDev = (arr) => {
    const n = arr.length
    const mean = arr.reduce((a, b) => a + b) / n
    return Math.sqrt(arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}

export const calcMedian = (arr) => {
    let values = [...arr].sort((a, b) => a - b); 
    const median = (values[(values.length - 1) >> 1] + values[values.length >> 1]) / 2
    return median
}
export const calcModa = (arr) => {
    const list = {};

    arr.map((o) => {
        if (list[o]) {
            list[o] += 1;
        } else {
            list[o] = 1;
        }
    });

    const listFix = Object.entries(list).sort(
        (a, b) => a[1] - b[1]);
    const moda = listFix[listFix.length - 1];
    return moda;
}