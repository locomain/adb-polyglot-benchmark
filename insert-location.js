const { PerformanceObserver, performance } = require('perf_hooks');
const mongo = require('mongodb');

/**
 *
 * @param func
 * @returns {number}
 */
const benchmark = func =>{
    const timeBefore = performance.now();
    func();
    const timeAfter = performance.now();
    const cost = timeAfter-timeBefore;

    console.log(`Action took ${cost} milliseconds`);
    return cost;
};

/**
 *
 */
const insertLocationTest = db=>{
    let x = 0;
    while(x < 10000)
        db.collection('location').insertOne({
            email: `inserttest${x}@mail.com`,
            latitude: `10${x}.1234`,
            longitude: `156${x}.234`,
            date: new Date()
        },(error,response)=>x++)
};


mongo.MongoClient.connect("mongodb://localhost:27017/school",(error,db)=>{
    if(error)throw error;
    console.log("inserting locations");
    benchmark(()=>insertLocationTest(db));
});
