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
    const collection = await Utils.mysql(`SELECT * FROM post`);
    for(let item of collection){
        await LPUSH(`posts-${item.EMAIL}`,JSON.stringify(item));
    }
};

//run test
const runTest = async ()=>{
    const resultSet = [];
    const collection = await Utils.mysql(`SELECT * FROM user`);
    for(let item of collection){
        resultSet.push(LRANGE(`posts-${item.EMAIL}`,0,-1));
    }
};

generateTestData()
    .then(()=>{
        console.log("start selection test");
        Utils.benchmark(runTest,true);
    });
