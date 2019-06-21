const { PerformanceObserver, performance } = require('perf_hooks');
const mongo = require('mongodb');
const data = [];

//generate data
for(let x = 0; x<1000000; x++){
    data.push({
        email: `inserttest${x}@mail.com`,
        latitude: `10${x}.1234`,
        longitude: `156${x}.234`,
        date: new Date()
    })
}


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


mongo.MongoClient.connect("mongodb://localhost:27017",(error,db)=>{
    if(error)throw error;
    console.log("inserting locations");
    benchmark(()=>
        db.db('school').collection('location').insertMany(data)
    );
});
