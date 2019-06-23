const Utils = require('./helpers/utils');

//generate test data
const generateTestData = async ()=>{
    const collection = await Utils.mysql(`SELECT * FROM post`);
    await Utils.mongo(db=>{
        const postCollection = db.collection('post');

        //drop collection
        console.log("dropping post collection");
        postCollection.drop();

        //insert test data
        console.log("inserting posts\n");
        postCollection.insertMany(collection);
    });
};

//run test
const runTest = async ()=>{
    const resultSet = [];
    const collection = await Utils.mysql(`SELECT * FROM user`);
    await Utils.mongo(async db=>{
        const postCollection = db.collection('post');
        for(const user of collection){
            // get latest location of user
            const result = await postCollection.find({ EMAIL: user.EMAIL }).toArray();
            if(result.length>0){
                console.log(result);
                resultSet.push({
                    user: user.EMAIL,
                    result
                });
            }

        }
    });
};

generateTestData()
    .then(()=>{
        console.log("start selection test");
        Utils.benchmark(runTest,true);
    });
