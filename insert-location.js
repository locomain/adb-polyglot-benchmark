const { PerformanceObserver, performance } = require('perf_hooks');

const benchmark = func =>{
    const timeBefore = performance.now();
    func();
    const timeAfter = performance.now();
    return timeAfter-timeBefore;
};


const time = benchmark(()=>
    setTimeout(()=>{},1000)
);
console.log(time);