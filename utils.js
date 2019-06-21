const { PerformanceObserver, performance } = require('perf_hooks');

module.exports = class Utils {

    /**
     * Prints the time elapsed by func
     *
     * @param func
     * @returns {number}
     */
    static benchmark(func){
        const timeBefore = performance.now();
        func();
        const timeAfter = performance.now();
        const cost = timeAfter-timeBefore;

        console.log(`Action took ${cost} milliseconds`);
        return cost;
    }
};
