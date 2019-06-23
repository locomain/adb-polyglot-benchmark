const Utils = require('./helpers/utils');
const redis = require('redis').createClient();
const {promisify} = require('util');

const LPUSH = promisify(redis.LPUSH).bind(redis);
const LRANGE = promisify(redis.LRANGE).bind(redis);

redis.on("error", function (err) {
    console.log("Error " + err);
});

//generate test data
const generateTestData = async ()=>{
    console.log("generating Redis test data")
    const collection = await Utils.mysql(`SELECT * FROM location ORDER BY EMAIL LIMIT 1`);
    for(let item of collection){
        await LPUSH(`location-${item.EMAIL}`,JSON.stringify(item));
    }
};

//run test
const runTest = async ()=>{
    const resultSet = [];
    const collection = await Utils.mysql(`SELECT * FROM user LIMIT 1000`);
    for(let item of collection){
        resultSet.push(await LRANGE(`location-${item.EMAIL}`,0,0));
    }
};

generateTestData()
    .then(()=>{
        console.log("start selection test");
        Utils.benchmark(runTest,true);
    });

