const Utils = require('./helpers/utils');


/*
//generate test data
Utils.mysql(`SELECT * FROM location`,collection=>{
    Utils.mongo(db=>{
        const locationCollection = db.collection('location');

        //drop collection
        console.log("dropping locations collection");
        locationCollection.drop();

        //insert test data
        console.log("inserting locations");
        locationCollection.insertMany(collection)

    });
});
*/


const generateTestData = async ()=>{
    const collection = await Utils.mysql(`SELECT * FROM location`);
    await Utils.mongo(db=>{
        const locationCollection = db.collection('location');

        //drop collection
        console.log("dropping locations collection");
        locationCollection.drop();

        //insert test data
        console.log("inserting locations\n");
        locationCollection.insertMany(collection)
    });
};


const runTest = async ()=>{
    const resultSet = [];
    const collection = await Utils.mysql(`SELECT * FROM user LIMIT 1`);
    console.log(collection);
    await Utils.mongo(db=>{
        const locationCollection = db.collection('location');
        for(const user of collection){
            // get latest location of user
            resultSet.push(locationCollection.find({
                email: user.EMAIL
            }));
        }
        console.log(resultSet);
    });
};

generateTestData()
    .then(()=>{
        console.log("start selection test");
        Utils.benchmark(runTest)
        //runTest();
    });
