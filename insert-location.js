const Utils = require('./utils');
const mongo = require('mongodb');
const data = [];


console.log(Utils);

//generate data
for(let x = 0; x<1000000; x++){
    data.push({
        email: `inserttest${x}@mail.com`,
        latitude: `10${x}.1234`,
        longitude: `156${x}.234`,
        date: new Date()
    });
}

//insert data
mongo.MongoClient.connect("mongodb://localhost:27017",(error,mongo)=>{
    if(error)throw error;
    const db = mongo.db('school');
    const locationCollection = db.collection('location');
    locationCollection.drop();

    console.log("inserting locations");
    Utils.benchmark(()=>
        locationCollection.insertMany(data)
    );
});
