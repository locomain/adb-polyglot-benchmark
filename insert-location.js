const Utils = require('./helpers/utils');
const data = [];

//generate data
for(let x = 0; x<1000000; x++){
    data.push({
        email: `inserttest${x}@mail.com`,
        latitude: `10${x}.1234`,
        longitude: `156${x}.234`,
        date: new Date()
    });
}

//run test
Utils.mongo(async db=>{
    const locationCollection = db.collection('location');

    //drop collection
    locationCollection.drop();

    //start insert
    console.log("inserting locations");
    await Utils.benchmark(()=>
        locationCollection.insertMany(data)
    );
});

