const Utils = require('./helpers/utils');



//generate test data
const generateTestData = async ()=>{
    const collection = await Utils.mysql(`SELECT * FROM location`);
    await Utils.mongo((db,instance)=>{
        const locationCollection = db.collection('location');

        //drop collection
        console.log("dropping locations collection");
        locationCollection.drop();

        //insert test data
        console.log("inserting locations\n");
        locationCollection.insertMany(collection);
    });
};

//run test
const runTest = async ()=>{
    const resultSet = [];
    const collection = await Utils.mysql(`SELECT * FROM user`);
    await Utils.mongo(async db=>{
        const locationCollection = db.collection('location');
        for(const user of collection){
            // get latest location of user
            const result = await locationCollection.find({ EMAIL: user.EMAIL }).sort({DATE:+1}).limit(1).toArray();
            console.log(result);
            resultSet.push(result);
        }
    });
    console.log(resultSet);
};

generateTestData()
    .then(()=>{
        console.log("start selection test");
        Utils.benchmark(runTest,true);
    });
