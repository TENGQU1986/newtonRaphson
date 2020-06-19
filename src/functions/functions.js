const fx = (func, x) => {
    console.log(func(x))
    return func(x)
}

const fxDerivative = (str='1x2a', x) => {
    const sign = str[str.length - 1]
    str = str.replace(str[str.length - 1], '')
    const toArr = str.split('x')
    const pow = toArr[1] - 1
    const coefficient = toArr[0] * toArr[1]
    
    if(pow == 0 && sign == 'a') {
        return coefficient
    } else if (pow < 0) {
        return 0
    } else if (pow == 0 && sign == 'b') {
        return -coefficient
    }
    let result = 1
    for(let i = 0; i < pow; i++) {
        result *= x
    }
    return sign == 'a' ? result * coefficient : - result * coefficient
}

const poly = (str='1x2b', x) => {
    const sign = str[str.length - 1]
    str = str.replace(str[str.length - 1], '')
    const toArr = str.split('x')
    const pow = toArr[1]
    const coefficient = toArr[0]
    if (pow == 0 && sign == 'a') {
        // console.log(coefficient)
        return parseInt(coefficient)
    } else if (pow == 0 && sign == 'b') {
        return -parseInt(coefficient)
    }
    let result = 1
    for(let i = 0; i < pow; i++) {
        result *= x
    }
    // console.log(result * coefficient)
    // console.log(sign == 'a' ? result * coefficient : - result * coefficient)
    return sign == 'a' ? result * coefficient : - result * coefficient
}

const totalFx = (str = '1x2+2x3', x) => {
    const arr = str.split('+')
    let result = 0
    for(let i in arr) {
        result += poly(arr[i], x)
    }
    // console.log('totalFx', result)
    return result
}

const totalDeriv = (str = '1x2+2x3', x) => {
    const arr = str.split('+')
    let result = 0
    // console.log('arr', arr)
    for(let i of arr) {
        result += fxDerivative(i, x)
        // console.log('result inside', result)
    }
    // console.log('totalDeriv', result)
    return result
}

const raphson = (str='1x2+2x3', x, error = 1) => {
    let count = 0
    while(totalFx(str, x) > error && count < 50) {
        console.log(count)
        x = x - (totalFx(str, x) / totalDeriv(str, x))
        count++
        raphson(str, x)
    }
    console.log('final result', x - (totalFx(str, x) / totalDeriv(str, x)))
    return x - (totalFx(str, x) / totalDeriv(str, x))
}

export { fx, fxDerivative, poly, totalFx, totalDeriv, raphson }